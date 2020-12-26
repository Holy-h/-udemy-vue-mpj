<template>
  <section>
    <base-card>
      <h2>길을 잃어버렸어요 ㅠㅠ</h2>
      <div class="img-wrapper">
        <img
          src="https://i.pinimg.com/564x/5b/13/69/5b1369fc82ddec7b1d287f3a8543c5bc.jpg"
          alt="PageNotFound"
        />
      </div>
      <p>다시 집으로 돌아가도록 해요!</p>
      <base-button :link="true" :to="{ name: 'coachesList' }">
        Go to Home
      </base-button>
    </base-card>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.img-wrapper {
  display: flex;
}

.img-wrapper img {
  margin: auto;
}
</style>
