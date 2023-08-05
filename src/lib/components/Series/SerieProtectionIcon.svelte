<script lang="ts">
	import { Feather } from 'sveltekit-feather-icons';

	export let protection: 'public' | 'private' | 'protected' = 'public';

	const icons = {
		public: 'eye',
		private: 'lock',
		protected: 'shield',
	};
</script>

<Feather icon={icons[protection]} classes="inline-block" />
