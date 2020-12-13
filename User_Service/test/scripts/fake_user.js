import faker from 'faker'

export default async function fake_user() {

    return {
        name: faker.name.firstName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        depend: faker.random.number(),
        description: faker.commerce.productDescription(),
        username: faker.internet.userName()
    };

}