const base=require('../app/controller/api/v1/transactions')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse=()=>{
    const res={}
    res.json=jest.fn().mockReturnValue(res)
    res.status=jest.fn().mockReturnValue(res)
    return res
}
describe("transactions.get function",()=>{
    test("res.json called with transactions data",async()=>{
        const req=mockRequest()
        const res=mockResponse()
        await base.get(req,res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status:'Success',
                code:200,
                message:'success!',
                data:expect.any(Object)
            })
        )
       
    })
})
describe("transactions.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
           source_account_id:1,
           destination_account_number:2,
           amount:20000
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
describe("transactions.getbyid function",()=>{
    test("res.json called with transactions data id",async()=>{
        let req=mockRequest()
        const res=mockResponse()
        req.params.transactionId=1
        await base.getById(req,res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status:'success',
                code:200,
                message:'Success!',
                data:expect.any(Object)
            })
        )
    })
})