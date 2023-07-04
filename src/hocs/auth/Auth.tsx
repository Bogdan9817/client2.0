import { useState } from "react";
import InputField from "../../UI/input/InputField";
import Button from "../../UI/button/Button";
import { api } from "../../api/api";
import { useCookies } from "react-cookie";
import "./styles/styles.scss";
import { toast } from "react-toastify";
import Form from "../../UI/form/Form";

export default function Auth() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookie] = useCookies();
  const submit = async () => {
    if (!name || !password) {
      return toast("Fill the inputs", { type: "warning", autoClose: 1000 });
    }
    try {
      const user = await api.post("/auth/signin", { name, password });
      setCookie("userId", user.data.id, { path: "/", maxAge: 3600 });
      setCookie("userRole", user.data.role, { path: "/", maxAge: 3600 });
    } catch (e: any) {
      toast(e.response?.data?.errorMessage || "Помилка сервера", {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className='container'>
      <Form withClose submit={submit}>
        <InputField
          value={name}
          label="Ім'я"
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          value={password}
          label='Пароль'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title='Надіслати' onClick={submit} />
      </Form>
    </div>
  );
}
