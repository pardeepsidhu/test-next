
import { QueryProvider } from "../../app/queryProvider/queryProvider"; 

export default function Layout({ children }) {
  return (
   
        <QueryProvider>{children}</QueryProvider>
    
  );
}
