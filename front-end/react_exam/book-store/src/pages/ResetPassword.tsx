import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassword, resetRequest } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';
import { SignupStyle } from './Signup';
import { useState } from 'react';

export interface ResetPasswordProps {
  email :string;
  pwd : string;
  idx : number | null;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const {showAlert} = useAlert();
  const [resetRequested, setResetRequested] = useState(false);
  const [resetIdx, setResetIdx] = useState<number | null>(null);
  const { register ,handleSubmit, formState : {errors}} = useForm<ResetPasswordProps>();
  const onSubmit = (data : ResetPasswordProps) => {
    if(resetRequested){
      // 초기화
      data.idx = resetIdx;
      resetPassword(data).then((res) => {
        setResetIdx(null);
        setResetRequested(false);
        showAlert("성공쓰");
        navigate("/login")
      }).catch(({response}) => {showAlert(response.data.message)})
    }else {
      // 초기화 요청
      resetRequest(data).then((res) => {
        setResetRequested(true);
        setResetIdx(res.data);
      }).catch(({response}) => {showAlert(response.data.message)})
    }
  }
  return (
    <>
      <Title size = "large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit = {handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder = "이메일"  inputType='email' {...register("email", {required : true})}/> {/*required는  validation.. 필수냐!*/}
            {errors.email && 
            <p className='error-text'>이메일을 입력해주세요</p>}
          </fieldset>
          {
            resetRequested && (
              <fieldset>
                <InputText placeholder='비밀번호'  inputType='password' {...register("pwd", {required : true})}/>
                {errors.pwd && 
                <p className='error-text'>비밀번호를 입력해주세요</p>}
              </fieldset>
            )
          }
          <fieldset>
            <Button type = "submit" size = "medium" scheme = "primary">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
        <div className='info'>
          <Link to = "/reset">비밀번호 초기화</Link>
        </div>
      </SignupStyle>
    </>
  );
}

export default ResetPassword;