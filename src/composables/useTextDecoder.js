export default ()=> {
    return {
        decodeRole(role) {
            const roleList = {
                "ADMIN":"管理员",
                "MEMBER":"成员"
            }
            return roleList[role]
        },
        decodeSex(sex) {
            const sexList = {
                "MALE":"男",
                "FEMALE":"女",
                "OTHER":"非二元",
                "UNSET":"未设置"
            }
            return sexList[sex]
        },
        decodePublishStatus(status) {
            return status? '已发布':'未发布'
        }
    }
}