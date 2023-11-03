const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async get(req, res){
        // console.log('masuk');
        const account=await prisma.bankAccount.findMany() //camelCase
      
        if(!account.length) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Empty'
        })
        // console.log(user.length)

       

       return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: account
        })
    },
    async getById(req, res){
        const account = await prisma.bankAccount.findUnique({
            where: {
                id: +req.params.accountId,
            }
        })
        // console.log(account.length);
        if(!account) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Empty'
        })
        return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: account
        })

    },
    async create(req, res){
        // console.log(req.body.userId)
        const user = await prisma.user.findUnique({
            where: {
                id: +req.body.userId,
            },
        })
        // console.log(user)
        if(user){
            const account=await prisma.bankAccount.create({
                data:req.body
            })
            if(account){
            return res.status(201).json({ 
                    status: 'success', 
                    code: 200, 
                    message: 'Data ditambahkan!',
                    data: account
                })
            }else{
                return res.status(400).json({ 
                    status: 'failed', 
                    code: 400, 
                    message: 'Gagal menambah data!',
                    // data: result
                })
            }
        }
        return res.status(400).json({ 
            status: 'failed', 
            code: 400, 
            message: 'userId yang dimasukkan tidak ada',
            // data: result
        })
        
    }
   
   
}