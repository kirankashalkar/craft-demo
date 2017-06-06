import React from 'react';
import { storiesOf } from '@kadira/storybook';

//
import FieldBuilderComponent from '../FieldBuilderComponent';

storiesOf('Field Builder Component', module)
	.addDecorator((story) => (
	    <div style={{textAlign: 'center'}}>
	      {story()}
	    </div>
	  ))
    .add('with prop', () => (
        <FieldBuilderComponent user={"Friend"} />
    ))
    .add('with no prop', () => (
    	<FieldBuilderComponent />
    ));

