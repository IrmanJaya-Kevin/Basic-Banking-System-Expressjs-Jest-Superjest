const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async get(req,res){
        let data = await prisma.transaction.findMany({include:{sender:true,receiver:true}});
        if(!data.length) return res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Data Empty',
        });

        res.status(200).json({
            status: 'Success',
            code : 200,
            message: 'success!',
            data: data
        });
    },
    async getById(req,res){
        if(!req.params.transactionId) res.status(400).json({
            status: 'fail',
            code : 400,
            message: 'Bad Request! id is required',
        });

        const data = await prisma.transaction.findUnique(
            {where:
                {
                    id: +req.params.transactionId
                },
                include:{
                    sender:{
                        include:{
                            user:true
                    }},
                    receiver:{
                        include:{
                            user:true
                    }}
                }},
            );

        res.status(200).json({
            status: 'success',
            code : 200,
            message: 'Success!',
            data: data
        });
    },
    async create(req, res){
        console.log(req.body)
        if(+req.body.source_account_id==+req.body.destination_account_number){
            return res.status(400).json({ 
                status: 'failed', 
                code: 400, 
                message: 'Id sumber dan destinasi tidak boleh sama!',
            })
        }
        const account = await prisma.bankAccount.findUnique({
            where: {
                id: +req.body.source_account_id,
            },
        })
        const account2 = await prisma.bankAccount.findUnique({
            where: {
                id: +req.body.destination_account_number,
            },
        })
        if(account && account2){
            if(+req.body.amount>0 || account.balance>=+req.body.amount){
                const transaction=await prisma.transaction.create({
                        data:{
                            source_account_id: +req.body.source_account_id,
                            destination_account_number: +req.body.destination_account_number,
                            amount: +req.body.amount,
                            // sender:null,
                            // receiver:null
                        }
                       
                        // data:req.body
                    })
                    // console.log(transaction)
                    if(transaction){
                        const deposit = await prisma.bankAccount.update({
                            where :{
                                id: +req.body.destination_account_number
                                
                            },
                            data:{
                                balance: +account2.balance + +req.body.amount
                            }
                        });
                        const withdraw = await prisma.bankAccount.update({
                            where :{
                                id: +req.body.source_account_id,
                            },
                            data:{
                                balance: +account.balance - +req.body.amount
                            }
                        });
                        if(deposit && withdraw){
                            return res.status(201).json({ 
                                    status: 'success', 
                                    code: 200, 
                                    message: 'Data ditambahkan!',
                                    data: transaction
                                })
                        }
                }
            }
        }
        return res.status(400).json({ 
            status: 'failed', 
            code: 400, 
            message: 'Gagal menambah data!',
            // data: result
        })
    }
   
   
}