/*global define */
define({
    'widgets': {
        'subject_list_screen': {
            'extends': 'screen',
            'name': 'Subject list screen',
            'attributes': {
                'title': 'Your subjects'
            },
            'children': {
                'subject_list_widget': {
                    'extends': 'list'
                }
            }
        },
        'subject_screen': {
            'extends': 'screen',
            'name': 'Subject screen',
            'attributes': {
                'title': 'Your subject'
            },
            'children': {
                'subject_name': {
                    'extends': 'text',
                    'attributes': {
                    }
                }
            }
        }
    },
    'data': {
        'subject_list': {'name': 'Subject list', 'type': 'list'}
    },
    'actions': {
        'init': {
            'actions': [
                {'action': 'listen', 'args': {
                    'component': 'program',
                    'eventName': 'start',
                    'actions': [
                        {'action': 'show_subject_list'}
                    ]
                }}
            ]
        },
        'show_subject_list': {'name': 'Show a list of subjects the student is taking', 'actions': [
            {'action': 'for_each', 'args': {
                'item': 'subject',
                'list': 'subject_list'
            }}
        ]},
        'show_targets_for_subject': {'name': 'Show the targets for the subject', 'actions': [
            {'action': 'show', 'args': {
                'widget': 'subject_screen'
            }}
        ]}
    }
});
