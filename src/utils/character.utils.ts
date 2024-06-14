import { Character } from "@interfaces/api";
import { FilterState } from "@interfaces/components";

export const sortCharacters = (characters: Character[]) => {
    return characters.sort((a, b) => {
        if (a.gender === b.gender) {
            return a.name.localeCompare(b.name);
        }
        return a.gender.localeCompare(b.gender);
    });
};

export const filterCharacters = (characters: Character[], filter: FilterState) => {
    return characters.filter((char) => {
        if (filter.status && char.status !== filter.status) {
            return false;
        }
        if (filter.species && char.species !== filter.species) {
            return false;
        }
        return true;
    });
};
