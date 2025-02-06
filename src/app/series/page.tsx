import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@iptv/components/ui/accordion";
import { Card, CardDescription, CardHeader, CardTitle } from "@iptv/components/ui/card";
import { ACTION, BASE_URL } from "@iptv/utils/credentials";
import Link from "next/link";
import { cache } from "react";

export const revalidate = 300;

const fetchCategories = cache(async () => {
  return fetch(BASE_URL + ACTION.GET_SERIES_CATEGORIES, {
    next: { revalidate },
  }).then((res) => res.json());
});


export default async function Series() {
  const categories = await fetchCategories();

  const prefixes: string[] = Array.from(new Set(categories.map((category) => category.category_name.split("|")[0])));

  return (
    <Accordion type="single" collapsible className="w-full overflow-scroll">
      {prefixes.map((prefix) => (
        <AccordionItem value={prefix} key={prefix}>
          <AccordionTrigger>{prefix}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2"> 
              {categories
                .filter((category) => category.category_name.startsWith(prefix))
                .map((category) => (
                  <Link key={category.category_id} href={"/series/category/" + category.category_id}><Card>
                    <CardHeader>
                      <CardTitle>{category.category_name.split('|')[1]}</CardTitle>
                      <CardDescription>{category.category_id}</CardDescription>
                    </CardHeader>
                  </Card></Link>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
      {
        !!categories.filter((category) => category.category_name.split('|').length === 1).length && (<AccordionItem value="other" key="other">
         <AccordionTrigger>Autres</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2"> 
              {categories
                .filter((category) => category.category_name.split('|').length === 1)
                .map((category) => (
                  <Link key={category.category_id} href={"/series/category/" + category.category_id}><Card>
                    <CardHeader>
                      <CardTitle>{category.category_name}</CardTitle>
                      <CardDescription>{category.category_id}</CardDescription>
                    </CardHeader>
                  </Card></Link>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>)
      }
      
    </Accordion>
  );
}
