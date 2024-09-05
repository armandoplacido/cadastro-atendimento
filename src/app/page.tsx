import FormService from "@/components/form_service";
import ListServices from "@/components/list_services";

export default function Home() {
  return (
   <main className="flex flex-col min-h-full">
    <div className="flex justify-between content-center gap-4 min-h-full">
      <FormService/>
      <ListServices/>
    </div>
   </main>
  );
}
