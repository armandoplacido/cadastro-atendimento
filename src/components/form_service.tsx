'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { tipoAtendimento } from "@/type/tipo_atendimento"
import InputError from "./ui/input_error"

const FormSchema = z.object({
  prestador:z.string().min(1,"prestador é obrigatório"),
  atendente:z.string().min(1,"atendente é obrigatório"),
  tipo_atendimento:z.enum(tipoAtendimento,{required_error:"tipo de atendimento é obrigatório"}),
  telefone:z.string()
})


export default function FormService() {
  const {register , handleSubmit, formState: { errors }, control} = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <div className="self-start min-w-96 shadow-xl bg-white px-3 py-5 rounded-lg">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <h1 className="text-2xl">Cadastrar chamado</h1>
        <span className="h-[1px] bg-slate-300"></span>

        <div className="mt-2">
          <Label htmlFor="prestador">Prestador</Label>
          <Input 
            placeholder="Nome Prestador" 
            type="text" 
            id="prestador" 
            {...register('prestador')} />
          {errors.prestador && <InputError>{errors.prestador.message}</InputError>}
        </div>

        <div className="mt-2">
          <Label htmlFor="atendente">Atendente</Label>
          <Input 
            placeholder="Nome Atendente" 
            type="text" 
            id="atendente" 
            {...register('atendente')} />
          {errors.atendente && <InputError>{errors.atendente.message}</InputError>}
        </div>

        <div className="mt-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input 
            placeholder="(00) 0 0000-0000" 
            type="tel" 
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={15}
            id="telefone" 
            {...register('telefone')} />
          {errors.atendente && <InputError>{errors.atendente.message}</InputError>}
        </div>

        <div className="mt-2">
        <Label htmlFor="tipo_atendimento">Tipo de atendimento</Label>
        <Controller
          name="tipo_atendimento"
          control={control}
          render={({field}) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de atendimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tipoAtendimento.map(atendimento => <SelectItem key={atendimento} value={atendimento}>{atendimento}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            )}/>
            {errors.tipo_atendimento && (
            <InputError>{errors.tipo_atendimento.message}</InputError>
            )}
        </div>

        <Button className="mt-6" type="submit">Cadastrar</Button>
      </form>
    </div>
  )
}