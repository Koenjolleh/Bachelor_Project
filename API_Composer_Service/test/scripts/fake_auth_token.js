
import jwtSecret from '../../config/config';
import jwt from 'jsonwebtoken';

export default function fake_auth_token() {

    return 'JWT ' + jwt.sign({ id_user: 10 }, jwtSecret.secret, {
        expiresIn: 60 * 60,
    });
    
}