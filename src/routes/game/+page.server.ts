import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async({ cookies }) => {

    // https://localhost:5173/chat?name=Test1234&color=fff

    const user = cookies.get('user');
    const color = cookies.get('color');

    console.log('User - Cookie', user);
    console.log('Color - Cookie', color);

    if (!user) {
        throw redirect(303, '/');
    } else if (!color) {
        throw redirect(303, '/');
    }

    return {
        user,
        color
    }
}