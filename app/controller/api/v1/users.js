const { PrismaClient}=require('@prisma/client')

const prisma = new PrismaClient();


module.exports = {
    async get(req, res){
        const user=await prisma.user.findMany()
      
        if(!user.length) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Empty'
        })
        // console.log(user.length)

       

       return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: user
        })
    },
    async getById(req, res){
        const user = await prisma.user.findFirst({
            where: {
                id: +req.params.userId,
            },
            include:{
                profile:true
            }
        })
    //    console.log(user);
  
        if(!user) return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Empty'
        })
        return res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success!',
            data: user
        })

    },
    async create(req, res){
        // console.log(req.body)
        try {
            const user=await prisma.user.create({
                data: 
                {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    profile: 
                    {
                      create: 
                        {  
                            identity_number: req.body.identity_number,
                            address: req.body.address,
                            identity_type:req.body.identity_type
                        }
                    }
                   
                },
                include:{
                    profile:true
                }
                   
            })
            return res.status(201).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data ditambahkan!',
                data: user
            })
        } catch (error) {
            return res.status(400).json({ 
                status: 'failed', 
                code: 400, 
                message: 'Gagal menambah data(input data user dan profile dengan benar)!',
                // data: result
        })
        }
        
        // console.log(user);

       
       
        
    },
    async destroy(req, res){
        if(!req.params.userId) res.status(400).json({ 
            status: 'fail', 
            code: 400, 
            message: 'Bad Request! id is required',
        })
        userId=req.params.userId;
        // console.log(userId);
        const user = await prisma.user.delete({
            where: {
              id: +userId,
            },
          })
        if(user){
            res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Success Data terhapus!',
            })
        }
    }
   
}