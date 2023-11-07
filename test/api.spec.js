const request=require('supertest')
const app=require('../index')

describe("GET /api/v1/users",()=>{
    test("Return status: 200 and Users Data",async()=>{
        const res=await request(app).get('/api/v1/users')

        // console.log(res)
        // expect(res.statusCode).toBe(200)
        // expect(res.body).toHaveProperty('status')
        // expect(res.body).toHaveProperty('code')
        // expect(res.body).toHaveProperty('message')
        // expect(res.body).toHaveProperty('data')
        // expect(res.body.data).toEqual(expect.any(Array))
        expect(res.body).toEqual(
            expect.objectContaining({
                status:'success',
                code:200,
                message:'Success!',
                data:expect.any(Array)
            })
        )
    })
    // test("res.json called with no result", async ()=> {
    //     const req =mockRequest({
    //         query: {
    //             page:3,
    //             limit:5
    //         }
    //     })
    //     const res =mockResponse()
    //     await base.get(req, res)
    //     expect(res.status).toBeCalledWith(200)
    //     expect(res.json).toBeCalledWith(
    //         expect.objectContaining({
    //             status: 'success',
    //             code: 200,
    //             message: 'Success!',
    //             data: expect.any(Array)
    //         })
    //     )

    // })
})
// 
describe("POST /api/v1/auth",()=>{
    test("Return status: Login test, 201 and Users Token",async()=>{
        const res=await request(app).post('/api/v1/auth/login').send({
            email:'kevin@gmail.com',
            password:'password'
        })

        expect(res.body).toEqual(
            expect.objectContaining({
                status:'Success!',
                message:'Berhasil Login!',
                data:expect.any(Object)
            })
        )
    })
})


describe("POST /api/v1/auth",()=>{
        test("Return status: Register test, 201 and User",async()=>{
            const res=await request(app).post('/api/v1/auth/register').send({
                name:'jaya',
                email:'kyle@gmail.com',
                password:'password'
            })
            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
            expect(res.body).toHaveProperty('data')
            expect(res.body.data).toEqual(expect.any(Object))
        //    console.log(res.body.data.id)
        idDel=res.body.data.id
        })
        test("Return status: 200, Delete data",async()=>{
            const res=await request(app).delete(`/api/v1/users/${idDel}`)
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('code')
            expect(res.body).toHaveProperty('message')
           
        })
    })
describe("GET /api/v1/users",()=>{
    test("Return status: 200 and get Users Data id",async()=>{
        const res=await request(app).get('/api/v1/users/1')

        expect(res.body).toEqual(
            expect.objectContaining({
                status:'success',
                code:200,
                message:'Success!',
                data:expect.any(Object)
            })
        )
    })
    
})
describe("GET /api/v1/accounts",()=>{
    test("Return status: 200 and get Bank Account Data",async()=>{
        const res=await request(app).get('/api/v1/accounts')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
       
    })
    
})
describe("GET /api/v1/accounts",()=>{
    test("Return status: 200 and get Bank Account Data id",async()=>{
        const res=await request(app).get('/api/v1/accounts/2')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
    })
    
})
describe("GET /api/v1/transactions",()=>{
    test("Return status: 200 and get Transactions Data",async()=>{
        const res=await request(app).get('/api/v1/transactions')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
       
    })
    
})
describe("GET /api/v1/transactions",()=>{
    test("Return status: 200 and get Transactions Data id",async()=>{
        const res=await request(app).get('/api/v1/transactions/1')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
    })
    
})
describe("POST /api/v1/transactions",()=>{
    test("Return status: Register test, 201 and User",async()=>{
        const res=await request(app).post('/api/v1/transactions').send({
            source_account_id:2,
            destination_account_number:1,
            amount:20000
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
       
    })
})