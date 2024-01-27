import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import AddToBag from "@/components/AddToBag";
import CheckoutNow from "@/components/CheckoutNow";
import IamgeGallery from "@/components/IamgeGallery";
import { Button } from "@/components/ui/button";
import { BadgePercent, Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
          _id,
            images,
            price,
            name,
            description,
            "slug": slug.current,
            "categoryName": category->name,
            price_id
        }`;

  const data = await client.fetch(query);

  return data;
}

// export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white max-h-80">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <IamgeGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2 w-20 h-10">
                <span className="text-sm">4.7</span>
                <Star />
              </Button>
              <span className="text-sm text-gray-500 transition duration-150">
                352478+ Ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2 ">
                <span className="text-2xl font-bold text-gray-800 md:text-2xl">
                  {data.price}
                </span>
                <span className="mb-0.5  text-red-500 line-through">
                  {data.price + 5000}
                </span>

                <BadgePercent className="text-green-400 ml-4 mb-1" />
                <span className="font-bold text-xl mb-2.5  text-green-400">
                  22% off
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {" "}
                Incl. Instant shipping with Supreme{" "}
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
