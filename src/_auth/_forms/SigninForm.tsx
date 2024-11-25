import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValiadation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { createUserAccount } from '@/lib/appwrite/api'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext} from "@/context/AuthContext" 

const SigninForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const form = useForm<z.infer<typeof SigninValiadation>>({
    resolver: zodResolver(SigninValiadation),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const { mutateAsync: signInAccount } = useSignInAccount();

  async function onSubmit(user: z.infer<typeof SigninValiadation>) {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      })

      if(!session){
        return toast({title: 'Sign in failed. Please try again.'})
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate('/');
      } else {
        return toast({ title: 'Signin failed this time. Please try again.'})
      }
    }

  return (

  <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo"/>

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your accountt</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! please enter your details</p>
    </div>

    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-3/5 mt-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <Button type="submit" className="shad-button_primary">
      {isUserLoading ?  (
        <div className="flexcenter gap-2">
          <Loader /> Loading...
        </div>
      ): "Sign in"
    }
    </Button>
    <p className="text-small-regular text-light-2 text-center mt-2">
      Don't have an account? 
      <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
    </p>
    </form>
    </Form>
  )
}

export default SigninForm
