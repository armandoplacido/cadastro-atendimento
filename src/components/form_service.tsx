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
import { FormEvent } from "react"
import { Textarea } from "./ui/textarea"

const FormSchema = z.object({
  prestador:z.string().min(1,"Prestador inválido"),
  atendente:z.string().min(1,"Atendente inválido"),
  tipo_atendimento:z.enum(tipoAtendimento,{required_error:"Tipo de atendimento inválido"}),
  telefone:z.string().min(14, "Insira um número de telefone válido").max(15, "Número de telefone inválido"),
  observacao:z.string().optional()
})


export default function FormService() {
  const {register , handleSubmit, formState: { errors }, control} = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  function handlerFormatPhone(event: FormEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;
    value = value.replace(/\D/g, "")

    // Verifica a quantidade de dígitos para aplicar a máscara correta
    if (value.length > 10) {
      // Formato para números com 9 dígitos
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      // Formato para números com 8 dígitos
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      // Apenas o DDD
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      // Apenas o começo do DDD
      value = value.replace(/^(\d{0,2})/, "($1");
    }

    event.currentTarget.value = value;
  }

  return (
    <div className="self-start min-w-96 shadow-xl bg-white px-3 py-5 rounded-lg">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <h1 className="text-2xl">Cadastrar chamado</h1>
        <span className="h-[1px] bg-slate-300"></span>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="prestador">Prestador</Label>
          <Input 
            placeholder="Nome Prestador" 
            type="text" 
            id="prestador" 
            {...register('prestador')} />
          {errors.prestador && <InputError>{errors.prestador.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="atendente">Atendente</Label>
          <Input 
            placeholder="Nome Atendente" 
            type="text" 
            id="atendente" 
            {...register('atendente')} />
          {errors.atendente && <InputError>{errors.atendente.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="telefone">Telefone</Label>
          <Input 
            placeholder="(00) 00000-0000" 
            type="tel" 
            inputMode="numeric"
            maxLength={15}
            id="telefone" 
            onKeyUp={handlerFormatPhone}
            {...register('telefone')} />
          {errors.atendente && <InputError>{errors.atendente.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
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

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="observacao">Observação</Label>
          <Textarea 
            className="min-h-28"
            id="observacao" 
            {...register('observacao')} />
          {errors.observacao && <InputError>{errors.observacao.message}</InputError>}
        </div>

        <Button className="mt-6" type="submit">Cadastrar</Button>
      </form>
    </div>
  )
}