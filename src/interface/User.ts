import { School } from "@prisma/client";

export interface UserUpdateArgs {
    user: {
        school: School;
        name: string;
        profile_image?: string;
        introduction: string;
    };
}

export interface UserCreateArgs {
    user: {
        email: string;
        password: string;
        school: School;
        name: string;
        entrance_year: number;
        profile_image?: string;
        introduction?: string;
    };
}
