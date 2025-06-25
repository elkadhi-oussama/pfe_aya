import React from 'react'
import { MagnifyingGlassIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import './BinomyCss/About.css'
import { Fade, JackInTheBox} from 'react-awesome-reveal'



function About() {
  const features = [
    {
      name: 'Une recherche intelligente',
      description:
        'Grâce à notre algorithme, trouvez des colocataires qui correspondent à vos besoins en quelques clics.',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'Un espace sécurisé',
      description:
        'Tous les profils sont vérifiés pour garantir une expérience fiable et sereine.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Une messagerie intégrée',
      description:
        'Discutez directement avec vos futurs colocataires avant de prendre une décision.',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: 'Une plateforme dédiée aux étudiants',
      description:
        'Parce que nous comprenons les défis de la vie étudiante, Binomy est là pour vous accompagner !',
      icon: AcademicCapIcon,
    },
  ]
  return (

    <section className="history-area">
          <div className="row" >
            <center>
        <div className="col-lg-12 text-center">
        <span><JackInTheBox triggerOnce><img src='assets/b2.png' style={{width:'200px',height:'100px',borderRadius:'20px'}}/></JackInTheBox></span>
        <h2 className="display-5 fw-bold" style={{color:'#00AEEF',fontStyle:'italic',fontFamily:'cursive',fontSize:'50px',fontWeight:'bold'}}>A propos de nous ! </h2>
        </div>
        </center>
      </div>
    <div className="container" style={{margin:'0 auto',marginBottom:"5%"}}>
  
      <div className="row" style={{borderRadius:'20px'}}>
        <div className="col-lg-12">
          <div id="history-slid" className="carousel slide" data-ride="carousel" data-interval="false">
            <div className="carousel-inner">


              <div className="carousel-item row active">
              <Fade cascade damping={0.4}  direction='up' triggerOnce={true}>
                <div className="col-lg-8 col-md-12 pl-0"> 
                  <div className="history-img" style={{padding:'20px'}}>
                    <img className="img-fluid" src="assets/ab.jpg" alt="" style={{borderRadius:'20px'}} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 pr-0">
                  <div className="history-content">
                    
                    <h2 className="column-title wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="700ms">Trouver un colocataire n’a jamais <span>été aussi simple ! </span></h2>
                    <p style={{fontWeight:'bold', fontStyle:'italic',fontFamily:'cursive'}}>
                    Bienvenue sur Binomy, la plateforme conçue spécialement pour les étudiants étrangers à la recherche d’un binôme de colocation. Nous savons à quel point il peut être difficile de trouver une personne de confiance avec qui partager un logement, surtout dans un pays étranger.
                    </p>
                    <p style={{fontWeight:'bold', fontStyle:'italic',fontFamily:'cursive'}}><br/>
                    C’est pourquoi nous avons créé Binomy, un espace où vous pouvez rencontrer des étudiants ayant des critères et des attentes similaires aux vôtres.
                    </p>
                  </div>
                </div>
                </Fade>
              </div>{/* End off item*/}

            </div>{/* End off carusel inner */}
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Fade cascade damping={0.4} direction="up" triggerOnce={true}>
  <div className="mx-auto max-w-2xl lg:text-center">
    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance" style={{color:'#00AEEF',fontStyle:'italic',fontFamily:'cursive',fontSize:'50px',fontWeight:'bold'}}>
      Pourquoi choisir Binomy ?
    </p>
    <p className="mt-6 text-lg/8 text-gray-600" style={{fontWeight:'bold', fontStyle:'italic',fontFamily:'cursive'}}>
      Nous souhaitons faciliter l’intégration des étudiants étrangers en leur offrant un moyen simple et efficace de trouver un colocataire compatible, afin de rendre leur expérience plus agréable et rassurante.
    </p>
  </div>
  <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
      {features.map((feature) => (
        <div key={feature.name} className="relative pl-16">
          <dt className="text-base/7 font-semibold text-gray-900">
            <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
              <feature.icon aria-hidden="true" className="size-6 text-white" />
            </div>
            {feature.name}
          </dt>
          <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
        </div>
      ))}
    </dl>
  </div>
</Fade>
      </div>
    </div>
  </section>



  )
}

export default About