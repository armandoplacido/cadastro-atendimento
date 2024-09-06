import FormService from "@/components/form_service";
import ListServices from "@/components/list_services";

export default function Home() {
  return (
   <div className="flex flex-col min-h-[calc(100vh-2rem)]">
    <div className="flex flex-1 justify-between gap-4">
      <FormService/>
      <ListServices/>
    </div>
   </div>
  );
}
