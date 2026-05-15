import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Hero from '../sections/Hero'
import Intro from '../sections/Intro'
import BrandsMarquee from '../sections/BrandsMarquee'
import FeaturedFleet from '../sections/FeaturedFleet'
import Experience from '../sections/Experience'
import Services from '../sections/Services'
import Why from '../sections/Why'
import Testimonials from '../sections/Testimonials'
import FinalCta from '../sections/FinalCta'

export default function Home() {
  const { t } = useTranslation()
  return (
    <PageTransition>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
        image="https://accrocar.com/bently.webp"
        imageAlt={t('home.hero.imageAlt')}
        preloadImage="/bently.webp"
        preloadMobileImage="/bentlymobile.webp"
        url="https://accrocar.com/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Accrocar',
          description: t('seo.home.jsonLdDescription'),
          url: 'https://accrocar.com',
          logo: 'https://accrocar.com/logo.webp',
          image: 'https://accrocar.com/bently.webp',
          sameAs: ['https://www.instagram.com/accro_car?igsh=cWFnZTh6NGZhb3Yx'],
        }}
      />
      <Hero />
      <FeaturedFleet />
      <BrandsMarquee />
      <Intro />
      <Experience />
      <Services />
      <Why />
      <Testimonials />
      <FinalCta />
    </PageTransition>
  )
}
