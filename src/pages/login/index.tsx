import useAuth from "@/hooks/useAuth"
import useAuthStore from "@/store/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { authSchema } from "@/schema/auth"
import { AuthType } from "@/types/Auth.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { FormInput } from "@/components/form/FormInput"

const Login = () => {
  const { authMutation } = useAuth()
  const { login } = useAuthStore()

  const navigate = useNavigate()
  const auth = authMutation()

  const form = useForm<AuthType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      user_name: '',
      password: '',
    }
  })

  const onSubmit = (values: AuthType) => {
    auth.mutateAsync(values)
      .then((res) => login(res.data.user_name, res.data.permissions, res.data.token))
      .catch((err) => console.log(err))
      .finally(() => {
        window.location.reload()
        navigate("/")
      })

  }

  return (
    <div className="h-screen grid place-items-center">
      <Card className=" w-full max-w-sm">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Kirish</CardTitle>
              <CardDescription>
                Akkauntingizga kirish uchun quyidagini to'ldiring.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormInput
                control={form.control}
                name="user_name"
                label="Username"
                placeholder="Username"
              />
              <FormInput 
                control={form.control}
                name="password"
                label="Parol"
                type="password"
                placeholder="Parol"
              />
            </CardContent>
            <CardFooter>
              <Button disabled={auth.isPending} className="w-full">Kirish</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Login