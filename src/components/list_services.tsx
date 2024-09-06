import { Button } from "./ui/button";

export default function ListServices() {
  return(
    <div className="flex flex-col w-full shadow-xl bg-white px-3 py-5 rounded-lg">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl">Lista de Atendimentos</h1>
        <Button>Exportar</Button>
      </div>
      <span className="h-[1px] bg-slate-300"></span>

      <div className="flex flex-col gap-1 pt-2">
        <h4><strong>Prestador:</strong> MedRadius</h4>
        <p><strong>Atendente:</strong> Glaucia</p>
        <p><strong>Tipo de atendimento:</strong> Configuração do autorizador </p>
      </div>
    </div>
  )
}