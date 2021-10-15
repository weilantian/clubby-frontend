export default ()=> {
    return {
        userEditRules: {
            name:[{
                required: true,
                message: "请输入姓名",
                trigger:'blur'
            }],roleName: [{
                required: true,
                message: "请输入社员角色 如：社长 副市长 管理员 社员 等"
            }],
            sex: [{
                required: true,
                message:"请选择性别"
            }],
            email: [{
                required: true,
                message:"请输入邮箱"
            }],
            password: [{
                required: true,
                message:"请输入初始密码"
            }],role: [{
                required: true,
                message:"请选择账户类型"
            }]
        }
    }
}