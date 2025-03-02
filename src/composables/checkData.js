export function checkForm(){
    //비밀번호 같은지 체크하는부분
    const isCheckPass = (rule, value, callback) => {
        if(value !== formData.password){
            callback(new Error('填写的确认密码不一致'))
        }else{
            callback()
        }
    }
    //입력하는 아이디 체크부분
    const idFilterInput = (value) => {
        // 영문자 및 숫자만 허용
        formData.manager_id = value.replace(/[^a-zA-Z0-9]/g, "");
    };
    //아이디 체크
    const idCheck = (rule,value,callback)=>{
        //아이디가 영문,숫자로이루어져야한다 다음것은 패턴
        const regex = /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,17}$/;
        if(!regex.test(value)){
            callback(new Error("账号必须 * 1. 首字英文 * -- * 2. 英文，数字组合！ * -- * 3. 大于8字～少于20字！ *"))
        }else{
            callback()
        }
    }
    //비밀번호 영문,숫자,/특수기호 대문자 보류중/
    const passFilterInput = (value) => {
        //영문,숫자,/특수기호 대문자
        //loginForm.userId = value.replace(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,18}$/,"");
        // 영문자 및 숫자만 허용
        formData.password = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
    };
    //비밀번호 영문,숫자,/특수기호 대문자 보류중/
    const pass1FilterInput = (value) => {
        //영문,숫자,/특수기호 대문자
        //loginForm.userId = value.replace(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,18}$/,"");
        // 영문자 및 숫자만 허용
        formData.checkPassword = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
    };
    //비밀번호 체크
    const passCheck = (rule,value,callback)=>{
        //이부분은 비밀번호는 반드시 영문,숫자,특수기호로만 이루어져야하면 8-20자이내 여야한다
        const regex = /^[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if(!regex.test(value)){
            callback(new Error("密码 * 1. 只能用 英文，数字，特殊符号！ * -- * 2. 长度少于20字！ *"))
        }else{
            callback()
        }
    }

    return {
        isCheckPass,
        idFilterInput,
        passFilterInput,
        pass1FilterInput,
        idCheck,
        passCheck,
    }
}