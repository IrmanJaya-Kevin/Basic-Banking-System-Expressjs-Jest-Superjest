const base=require('../app/controller/api/v1/bank_accounts')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse=()=>{
    const res={}
    res.json=jest.fn().mockReturnValue(res)
    res.status=jest.fn().mockReturnValue(res)
    return res
}
describe("accounts.get function",()=>{
    test("res.json called with accounts data",async()=>{
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
    })
})
describe("accounts.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            bank_name: "bank test",
            account_number: 1324156,
            balance: 2000000,
            userId:1
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
        idDel=res.json.mock.calls[0][0].data.id

    })
    test("res.json called with status 200", async ()=> {
        let req =mockRequest({})
        const res =mockResponse()
        req.params.accountId=idDel
        await base.destroy(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Success Data terhapus!',
            })
        )

    })
})
describe("bankaccounts.getbyid function",()=>{
    test("res.json called with bank accounts data id",async()=>{
        let req=mockRequest()
        const res=mockResponse()
        req.params.accountId=1
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