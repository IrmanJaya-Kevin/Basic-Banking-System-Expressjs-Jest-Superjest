// unit testing
const base=require('../app/controller/api/v1/users')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
// const mockRequest=(body ={})=>({body})
const mockResponse=()=>{
    const res={}
    res.json=jest.fn().mockReturnValue(res)
    res.status=jest.fn().mockReturnValue(res)
    return res
}
//get user test
describe("users.get function",()=>{
    test("res.json called with users data",async()=>{
        const req=mockRequest()
        const res=mockResponse()
        await base.get(req,res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status:'success',
                code:200,
                message:'Success!',
                data:expect.any(Array)
            })
        )
        // done()
    })
    test("res.json called with no result", async ()=> {
        const req =mockRequest({
            query: {
                page:3,
                limit:5
            }
        })
        const res =mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Success!',
                data: expect.any(Array)
            })
        )

    })
})
describe("users.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            name: "tst",
            email: "tssssst@gmail.com",
            password: 'pass',
            identity_number:1234,
            identity_type:'tes1234',
            address:'rasau'
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data ditambahkan!',
                data: expect.any(Object)
            })
        )

    })
})