'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import InputError from "./ui/input_error"
import { FormEvent } from "react"
import { Textarea } from "./ui/textarea"
import { serviceType } from "@/type/service_type"
import { Service } from "@/type/service"

const FormSchema = z.object({
  provider:z.string().min(1,"Prestador inválido"),
  requester:z.string().min(1,"Atendente inválido"),
  serviceType:z.nativeEnum(serviceType,{required_error:"Tipo de atendimento inválido"}),
  phone:z.string().min(14, "Insira um número de telefone válido").max(15, "Número de telefone inválido"),
  observation:z.string().optional()
})


export default function FormService() {
  const {register , handleSubmit, formState: { errors }, control} = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const service:Service = {
      provider: data.provider,
      requester: data.requester,
      phone: data.phone,
      serviceType: data.serviceType,
      observation: data.observation,
    }
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
          <Label htmlFor="provider">Prestador</Label>
          <Input 
            placeholder="Nome Prestador" 
            type="text" 
            id="provider" 
            {...register('provider')} />
          {errors.provider && <InputError>{errors.provider.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="requester">Atendente</Label>
          <Input 
            placeholder="Nome Atendente" 
            type="text" 
            id="requester" 
            {...register('requester')} />
          {errors.requester && <InputError>{errors.requester.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="phone">Telefone</Label>
          <Input 
            placeholder="(00) 00000-0000" 
            type="tel" 
            inputMode="numeric"
            maxLength={15}
            id="phone" 
            onKeyUp={handlerFormatPhone}
            {...register('phone')} />
          {errors.phone && <InputError>{errors.phone.message}</InputError>}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
        <Label htmlFor="serviceType">Tipo de atendimento</Label>
        <Controller
          name="serviceType"
          control={control}
          render={({field}) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de atendimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(serviceType).map(service => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            )}/>
            {errors.serviceType && (
            <InputError>{errors.serviceType.message}</InputError>
            )}
        </div>

        <div className="grid w-full gap-1.5 mt-4">
          <Label htmlFor="observation">Observação</Label>
          <Textarea 
            className="min-h-28"
            id="observation" 
            {...register('observation')} />
          {errors.observation && <InputError>{errors.observation.message}</InputError>}
        </div>

        <Button className="mt-6" type="submit">Cadastrar</Button>
      </form>
    </div>
  )
}