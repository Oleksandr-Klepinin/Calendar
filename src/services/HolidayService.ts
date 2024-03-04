import axios from 'axios';

const API_BASE_URL = 'https://date.nager.at/api/v3';
const COUNTRY_CODE = 'UA';

export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    countries: string[] | null;
    launchYear: number | null;
    types: string[] | null;
}

export const getPublicHolidays = async (year: number): Promise<Holiday[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/PublicHolidays/${year}/${COUNTRY_CODE}`);

        return response.data as Holiday[];
    } catch (error) {
        console.error('Error fetching public holidays', error);

        return [];
    }
};