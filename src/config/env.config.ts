
interface IEnv {
    ACCESS_TOKEN_NAME: string;
    REFRESH_TOKEN_NAME: string;
    BETTER_AUTH_TOKEN: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_SECRET: string;
}


const configureEnv = (): IEnv => {
    const envArrays = [
        "ACCESS_TOKEN_NAME",
        "REFRESH_TOKEN_NAME",
        "BETTER_AUTH_TOKEN",
        "JWT_REFRESH_SECRET",
        "JWT_ACCESS_SECRET",
    ];

    envArrays.forEach((env: string) => {
        if (!process.env[env]) {
            throw new Error(`Env name: ${env} is missing`)
        }
    });


    return {
        ACCESS_TOKEN_NAME: process.env.ACCESS_TOKEN_NAME as string,
        REFRESH_TOKEN_NAME: process.env.REFRESH_TOKEN_NAME as string,
        BETTER_AUTH_TOKEN: process.env.BETTER_AUTH_TOKEN as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    }

}


export const getEnv = configureEnv();