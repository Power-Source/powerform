<section class="psource-dashboard-section">

	<?php $this->template( 'dashboard/widgets/widget-resume' ); ?>

	<div class="sui-row">

		<div class="sui-col-md-6">

			<?php $this->template( 'dashboard/widgets/widget-cform' ); ?>

			<?php $this->template( 'dashboard/widgets/widget-poll' ); ?>

		</div>

		<div class="sui-col-md-6">

			<?php if ( ! POWERFORM_PRO ) {
				$this->template( 'dashboard/widgets/widget-upgrade' );
			} ?>

			<?php $this->template( 'dashboard/widgets/widget-quiz' ); ?>

		</div>

	</div>

</section>
