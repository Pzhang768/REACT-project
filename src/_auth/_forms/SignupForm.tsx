import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { useForm } from 'react-hook-form'
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValiadation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'
import { createUserAccount } from '@/lib/appwrite/api'
import { useCreateUserAccount } from '@/lib/react-query/queriesAndMutations'
 
const SignupForm = () => {
  const { toast } = useToast()
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();

  const form = useForm<z.infer<typeof SignupValiadation>>({
    resolver: zodResolver(SignupValiadation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigninAccount } = useCreateUserAccount();
  async function onSubmit(values: z.infer<typeof SignupValiadation>) {
      const newUser = await createUserAccount(values); 
      if(!newUser){
        return toast({title: "Sign up failed. Please try again."})
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
        name: '',
        username: ''
      })

      if(!session){
        return toast({title: 'Sign in failed. Please try again.'})
      }
  }

  return (

  <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo"/>

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new Account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your details</p>
    </div>

    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-3/5 mt-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
      {isCreatingUser ?  (
        <div className="flexcenter gap-2">
          <Loader /> Loading...
        </div>
      ): "Sign up"
    }
    </Button>
    <p className="text-small-regular text-light-2 text-center mt-2">
      Already have an account? 
      <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
    </p>
    </form>
    </Form>
  )
}

export default SignupForm
