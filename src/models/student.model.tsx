export interface Student{
    name: string;
    email: string;
    phone: string;
    gender: string;
    details: StudentDetails;
}

export interface StudentDetails{
    finalizedUic: string;
    commuteTimeOptions: CommuteTimeOptions[];
    roomType: RoomType;
    roommateNumberPreferences: RoommatesNumber[];
    roomNumberPreferences: RoomsNumber[];
    mixedHouse: Choice;
    roommateSmokes: Choice;
    roommateDrinks: Choice;
    knowsCooking: Cooking;
    foodType: FoodType;
    roommateLanguagePreference: string;
    origin: string;
    gradYear: string;
    hobbies: string;
    extraInfo: string;
    visaLocation: string;
    company: string;
    experience: string;
    intrestedAreas: string;
    socialMediaLinks: string;
    budget: string;
    smoke: Choice;
    drink: Choice;
}

export enum CommuteTimeOptions {
    "5-10"=5,
    "10-15"=10,
    "15-30"=15,
    ">30"=30
}

export type RoomType = "Private Room" | "Shared Room";

export type RoommatesNumber = "1" | "2" | "2-3" | "3-5";

export type RoomsNumber = '1' | '2-3' | '>3';

export type Choice = 'Yes' | 'No' | 'No preference' | 'Occasionally is fine' | 'Not Applicable' | 'Occasionally';

export type Cooking = 'Yes' | 'No' | 'Learning';

export type FoodType = 'Non Vegetarian' | 'Vegetarian' | 'Eggiterian';

