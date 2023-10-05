<template>
    <v-sheet class="main-p" >
        <v-card class="title" color="black">
            <v-img class="banner-1" height="220" cover transition="fade-transition" color="black" src="https://www.hdwallpapers.in/download/lexus_lc_500_bespoke_red_car_carbon_2022_4k_hd_cars-HD.jpg" ></v-img>
            <h1 style="margin: 1%;" class="title">Bienvenido a Bespoke Builds</h1>
        </v-card>
        <v-card class="paragraph-1">
            <p>Bienvenido a Bespoke Builds, el lugar donde podrá encontrar los mejores servicios de reparación y tuneo de automóviles.
                 Somos un equipo de profesionales apasionados por los coches, que le ofrecemos soluciones personalizadas y de calidad para su vehículo. 
                 Ya sea que necesite una revisión mecánica, un cambio de neumáticos, una instalación de audio, una pintura nueva o un diseño exclusivo, 
                 en Bespoke Builds lo tenemos todo. Contamos con las herramientas, los materiales y la experiencia necesarios para hacer realidad 
                 sus sueños sobre ruedas. Navegue por nuestra página para conocer más sobre nosotros, nuestros trabajos realizados y nuestros precios 
                 competitivos. No dude en contactarnos si tiene alguna consulta o desea solicitar un presupuesto. Estaremos encantados de atenderle y 
                 de convertir su coche en una obra de arte. Bespoke Builds, donde su coche es nuestro proyecto.</p>
        </v-card>
        <v-carousel class="carousel">
            <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            ></v-carousel-item>
        </v-carousel>

    </v-sheet>
</template>
<style scoped>
.main-p{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1A1F35;
    color: white;
}

.banner-1{
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 20px;
}
.title{
    text-align: center;
    background-color: black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    font-family: 'Courier New', Courier, monospace;
}

.paragraph-1{
    background-color: rgba(0, 0, 0, 0.694);
    margin: 3%;
    color: white;
    text-align: center;
    padding: 3%;
    border-radius: 20px;
    font-size: larger;
}

.carousel{
    margin-top: 4%;
    background-color: rgba(0, 0, 0, 0.365);
    border-radius: 20px;
}
</style>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://www.yankodesign.com/images/design_news/2021/11/delorean-dmc-12-in-low-rider-boots-steals-the-limelight-at-sema-2021/Wide-body-kit-Delorean-DMC-12_SEMA-2021_07.jpg'
          },
          {
            src: 'https://images.hgmsites.net/hug/2023-acura-integra-modified-for-2022-sema-show_100861706_h.jpg'
          },
          {
            src: 'https://s.yimg.com/ny/api/res/1.2/EsN9z.Vh1VHo3KrRarppQg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MA--/https://media.zenfs.com/en/car_and_driver_581/b7d082a8f0d63aa8c6fbd2c5140f68a2'
          },
          {
            src: 'https://st.hotrod.com/uploads/sites/21/2016/11/019-sema-show-2016-TENSEMA16-muscle-cars.jpg'
          }
        ]
      }
    }
  }
</script>