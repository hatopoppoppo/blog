<template>
	<header>
		<nuxt-link class="link" to="/">
			<h1>ブログ</h1>
		</nuxt-link>
	</header>
</template>
<script>
	export default {};
</script>
<style lang="scss" scoped>
header {
	color: #fff;
	padding: 10px 20px;
	box-shadow: 0 2px 10px rgba(0,0,0,.2);
	background-color: var(--accent-color);
}
header a{
	color: #fff;
	text-decoration: none;
}
</style>