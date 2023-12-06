
import Image from 'next/image'
import GradientPic from '@/public/gradient_dark.jpg'
import DonutPic from '@/public/pattern_donut.png'

export default function hero() {
  return (
    <>
    <section className="hero md:pt-32">
        <picture className="pointer-events-none absolute inset-0 z-10">
          <Image
            src={GradientPic}
            alt="gradient dark"
            className="h-full w-full"
          />
        </picture>
        <Image
          src={DonutPic}
          width={500}
          height={500}
          alt="pattern donut"
          className="absolute right-0 top-0 z-10"
        />
        </section>
    </>
);
}