import { fail, redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    const user = cookies.get('user');
    const color = cookies.get('color');

    console.log('User', user);
    console.log('Color', color);

    if(user && color) {
        throw redirect(303, '/game');
    }

    return {}
}

export const actions = {
    enterGame: async ({ request, cookies }) => {

        const formData = await request.formData();
        const user = String(formData.get('user'));
        const color = String(formData.get('color'));

        if (!user) {
            return fail(400, { user, color, missingUser: true });
        } else if (!color) {
            return fail(400, { user, color, missingColor: true });
        }

        cookies.set('user', user, {
            path: '/',
            httpOnly: true
        });
    
        cookies.set('color', color, {
            path: '/',
            httpOnly: true
        });

        throw redirect(303, '/game');
    }
}