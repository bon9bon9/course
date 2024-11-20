import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';
import { SignupStyle } from './Signup';
import { useAuthStore } from '../store/authStore';

export interface LoginProps {
  email :string;
  pwd : string;
}

const Login = () => {
  const navigate = useNavigate();
  const {showAlert} = useAlert();
  const {storeLogin} = useAuthStore();
  const { register ,handleSubmit, formState : {errors}} = useForm<LoginProps>();
  const onSubmit = (data : LoginProps) => {
    login(data).then((res) => {
      storeLogin(res.data);
      showAlert("로그인이 완료되었습니다");
      navigate("/");
    }, (error) => {
      showAlert("로그인 실패쨩")
    })
  }
  return (
    <>
      <Title size = "large">로그인</Title>
      <SignupStyle>
        <form onSubmit = {handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder = "이메일"  inputType='email' {...register("email", {required : true})}/> {/*required는  validation.. 필수냐!*/}
            {errors.email && 
            <p className='error-text'>이메일을 입력해주세요</p>}
          </fieldset>
          <fieldset>
            <InputText placeholder='비밀번호'  inputType='password' {...register("pwd", {required : true})}/>
            {errors.pwd && 
            <p className='error-text'>비밀번호를 입력해주세요</p>}
          </fieldset>
          <fieldset>
            <Button type = "submit" size = "medium" scheme = "primary">로그인</Button>
          </fieldset>
        </form>
        <div className='info'>
          <Link to = "/reset">비밀번호 초기화</Link>
        </div>
      </SignupStyle>
    </>
  );
}

export default Login;