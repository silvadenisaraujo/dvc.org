import React, { useRef, useCallback } from 'react'

import HeroSection from '../HeroSection'
import SubscribeSection from '../SubscribeSection'
import PromoSection from '../PromoSection'
import Link from '@dvcorg/gatsby-theme-iterative/src/components/Link'
import LearnMore from './LearnMore'
import LandingHero from './LandingHero'
import Diagram from './Diagram'
import UseCases from './UseCases'
import { logEvent } from '@dvcorg/gatsby-theme-iterative/src/utils/front/plausible'

import * as styles from './styles.module.css'

const Home: React.FC = () => {
  const diagramSectionRef = useRef<HTMLElement>(null)
  const useCasesSectionRef = useRef<HTMLElement>(null)
  const goToDocGetStarted = useCallback(
    () => logEvent('Promo', { Item: 'get-started' }),
    []
  )
  const goToFeatures = useCallback(
    () => logEvent('Promo', { Item: 'features' }),
    []
  )

  return (
    <>
      <HeroSection className={styles.heroSection}>
        <LandingHero scrollToRef={useCasesSectionRef} />
        <LearnMore scrollToRef={diagramSectionRef} />
      </HeroSection>
      <Diagram ref={diagramSectionRef} />
      <PromoSection
        title="For data scientists, by data scientists"
        buttons={[
          <Link href="/doc/start" onClick={goToDocGetStarted} key="get-started">
            Get Started
          </Link>,
          <Link href="/features" onClick={goToFeatures} key="features">
            Full Features
          </Link>
        ]}
      />
      <UseCases ref={useCasesSectionRef} />
      <SubscribeSection />
    </>
  )
}

export default Home
