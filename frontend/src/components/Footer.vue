<template>
    
   <div class="bg-indigo-lighten-1 text-center d-flex flex-column">
       
           <div>
         <v-btn
           v-for="icon in icons"
           :key="icon"
           :icon="icon"
           class="mx-4"
           variant="text"
         ></v-btn>
       </div>
   
       <div class="pt-0">
   Home services are essential in our fast-paced world, offering convenience and personalized care at your doorstep. Our web app connects you with trusted professionals for cleaning, maintenance, and personal care. With an easy-to-use interface, you can schedule appointments, track service progress, and give feedback. Enjoy top-notch service tailored to your needs and discover the efficiency of home services with just a few clicks.    </div>
   
       <v-divider></v-divider>
   
       <div>
         {{ new Date().getFullYear() }} — <strong>HANNACHI Ayoub<v-icon>mdi-copyright</v-icon></strong>
       </div>
   
     
   </div>
    
     </template>
     <script>
       export default {
       data: () => ({
         icons: [
           'mdi-facebook',
           'mdi-twitter',
           'mdi-linkedin',
           'mdi-instagram',
         ],
       }),
     }
     </script>
     