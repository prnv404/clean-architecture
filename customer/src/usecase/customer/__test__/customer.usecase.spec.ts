import { CustomerUseCase } from "../customer.usecase"
import { CustomerRepositoryImpl } from "../../../framework"

describe("CUSTOMER USECASE UNIT TESTING ", () => {

    let customerUsecase:CustomerUseCase
    let id: string
    
    beforeAll(async () => {

        customerUsecase = new CustomerUseCase(new CustomerRepositoryImpl())

    })


    it("SHOULD RETURN CUSTOMER CREATED", async () => {

        const result = await customerUsecase.SignUp({
            password: "password",
            email: "email@gmail.com",
            phone:"12345678"
        })        

       expect(result).toBeDefined()

    })


    test("SHOULD RETURN CUSTOMER SIGNIN", async () => {
        

        const result = await customerUsecase.SignIn({
            password: 'password',
            email:"email@gmail.com"
        })

        id = result?.data.id

        expect(result).toBeDefined()

    })


    test("SHOULD RETURN CUSTOMER NEW ADDRESS", async () => {
        

        const result = await customerUsecase.AddNewAddress(id,{
            street:"STREET",
            postalCode:"POSTAL",
            city:"CITY",
            country:"COUNTRY",
        })

        expect(result).toBeDefined()

    })

    test("SHOULD RETURN CUSTOMER PROFILE", async () => {
        

        const result = await customerUsecase.GetProfile(id)

        expect(result).toBeDefined()

    })

    test("SHOULD RETURN CUSTOMER SHOPPING DETAILS ", async () => {
        

        const result = await customerUsecase.GetShopingDetails(id)

        expect(result).toBeDefined()

    })


    test("SHOULD RETURN CUSTOMER SHOPPING DETAILS ", async () => {
        

        const result = await customerUsecase.GetShopingDetails(id)

        expect(result).toBeDefined()

    })

    


})