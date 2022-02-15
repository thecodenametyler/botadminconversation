
$(function() {
    adminconversation.init();
});


var adminconversation = {
    el: {
        debugger: true,
        appId: '#conversationChat',
        loader: '.js-conversationsLoader',
        placeholders: {
            mainWrapper: '.js-conversationsMainWrapper',
            sidebarWrapper: '.js-conversationsSidebarWrapper',
            containerWrapper: '.js-conversationsContainerWrapper',
            container: '.js-conversationsContainer'
        },
        modal: {
            wrapper: '.js-conversationsModalWrapper',
            target: '.js-conversationsModal',
            trigger: '.js-conversationsModalTrigger',
            close: '.js-conversationsModalClose'
        },
        takover: {
            target: '.js-conversationsTakeover',
            configStatusField: '.js-converstaionBotStatusField'
        },
        conversation: {
            empty: '.js-conversationsContainerEmpty'
        },
        sidebar: {
            navTab: '.js-conversationsSibebarTabNav',
            navTabItem: '.js-conversationsSibebarTabNavItem',
            navTabContent: '.js-conversationsSibebarTabContent',
            navList: '.js-conversationsSibebarNavList'
        },
        chatTemplates: {
            wrapper: '.js-conversationsChatTemplateWrapper',
            content: '.js-conversationsChatTemplateContent'
        },
        chatAccordion: {
            wrapper: '.js-conversationsChatAccordionWrapper',
            content: '.js-conversationsChatAccordionContent'
        },
        chatSendMessage: {
            textarea: '.js-conversationsChatSendmessageTextarea'
        },
        chatMessage: {
            body: '.js-conversationsChatBody',
            container : '.js-conversationsChatMessageContainer'
        },
        attachement: {
            field: '.js-conversationschAtattachmentField',
            trayWrapper: '.js-conversationschAtattachmentTrayWrapper',
            trayList: '.js-conversationschAtattachmentTrayList'
        }
    },
    init: ()=> {
        if(!!adminconversation.el.debugger) {
            console.log('Admin Conversation init FN');
        }

        if($(adminconversation.el.appId).length > 0) {
            adminconversation.generateBaseApp(adminconversation.el.appId);
        }

    },
    generateBaseApp:(id)=>{
        if(!!adminconversation.el.debugger) {
            console.log('generateBaseApp FN');
        }

        let templ = `
        <div class="conversations__wrapper js-conversationsMainWrapper">

            <div class="conversations__loader__wrapper js-conversationsLoader active">
                <div class="conversations__loader">
                    <i class="icon-pending_actions"></i>
                </div>
            </div>

            <div class="conversations__sidebar js-conversationsSidebarWrapper">
            
                <div class="conversations__sidebar__tab">

                    <div class="conversations__sidebar__nav__search">
                        <i class="icon-search"></i>
                        <input type="text" placeholder="Looking for something?" class="form-control" oninput="adminconversation.searchForConversation(event, this)">
                    </div>
                    
                    <div class="conversations__sidebar__tab__nav js-conversationsSibebarTabNav">
                        <div class="conversations__sidebar__tab__nav__item active js-conversationsSibebarTabNavItem" onclick="adminconversation.sidebarTabNavFilter(event, this, 'all')">ALL</div>
                        <div class="conversations__sidebar__tab__nav__item js-conversationsSibebarTabNavItem" onclick="adminconversation.sidebarTabNavFilter(event, this, 'ongoing')">ONGOING</div>
                        <div class="conversations__sidebar__tab__nav__item js-conversationsSibebarTabNavItem" onclick="adminconversation.sidebarTabNavFilter(event, this, 'closed')">CLOSED</div>
                    </div>

                    <div class="conversations__sidebar__tab__content js-conversationsSibebarTabContent">

                        <div class="conversations__sidebar__nav__wrapper">
                            <div class="conversations__sidebar__nav">
                                <ul class="conversations__sidebar__nav__list js-conversationsSibebarNavList">

                                </ul>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div class="conversations__container__wrapper js-conversationsContainerWrapper">
                <div class="conversations__container__empty js-conversationsContainerEmpty">
                    <i class="icon-chat"></i>
                    <p>Select a chat to start messaging</p>
                </div>
                <div class="conversations__container js-conversationsContainer d-none">
                </div>
                
            </div>

            <div class="js-conversationsModalWrapper">
            </div>

        </div>
        `;

        $(id).html(templ);

        adminconversation.fetchAllConversations(id);

        setTimeout(() => {
            adminconversation.loader(false);
        }, 1200);

    },
    fetchModals:(conversationId = 0, dataSet = [])=>{
        if(!!adminconversation.el.debugger) {
            console.log('fetchModals FN for converId: ' , conversationId);
        }

        $(adminconversation.el.modal.wrapper).html('');

        let templ = `
        <div id="conversationTagsCreate" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <a onclick="adminconversation.openModal(event, this, '#conversationTags')" class="btn btn--circle mr-2" href="#"><i class="icon-arrow_back"></i></a>
                    <h4>Add a Tag</h4>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationTagsCreate')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>

                <div class="conversations__modal__body">
                    <div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label for="" class="input-label">Select a Tag</label>
                                <select name="" id="" class="form-control" >
                                    <option value="tag_1">Tag 1</option>
                                    <option value="tag_2">Tag 2</option>
                                    <option value="tag_3">Tag 3</option>
                                    <option value="tag_4">Tag 4</option>
                                    <option value="tag_5">Tag 5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="conversations__modal__footer">
                    <ul class="conversations__modal__action">
                        <li class="conversations__modal__action__item">
                            <a onclick="adminconversation.saveConversationTag(event, this)" href="#" class="btn btn--icon btn--hover btn--hover-success btn-icon">Save<i class="icon-save"></i></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div id="conversationTags" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <h4>Tags</h4>
                    <a onclick="adminconversation.openModal(event, this, '#conversationTagsCreate')" class="btn btn--circle ml-2" href="#"><i class="icon-add"></i></a>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationTags')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>
                
                <div class="conversations__modal__body">
                    <ul class="conversations__accordion__list">`;
                        
                        let tagsArray = [
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`
                            },
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`
                            },
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`
                            },
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`
                            }
                        ];

                        tagsArray.forEach(function(tag) {
                            templ += `
                                <li class="conversations__accordion__item">
                                    <div class="conversations__accordion__title">
                                        <h5>${tag.title}</h5>
                                    </div>
                                </li>
                            `;
                        });

                    templ += `
                    </ul>
                </div>

            </div>
        </div>
            
        <div id="conversationNotesCreate" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <a onclick="adminconversation.openModal(event, this, '#conversationNotes')" class="btn btn--circle mr-2" href="#"><i class="icon-arrow_back"></i></a>
                    <h4>Add a Note</h4>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationNotesCreate')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>

                <div class="conversations__modal__body">
                    <div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label for="" class="input-label">Title</label>
                                <input type="text" class="form-control" name="" id="" value="" placeholder="Title..." aria-label="name">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label for="" class="input-label">Description</label>
                                <textarea class="form-control" name="" id="" value="" placeholder="description..." aria-label="description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="conversations__modal__footer">
                    <ul class="conversations__modal__action">
                        <li class="conversations__modal__action__item">
                            <a onclick="adminconversation.saveConversationNote(event, this)" href="#" class="btn btn--icon btn--hover btn--hover-success btn-icon">Save<i class="icon-save"></i></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div id="conversationNotes" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <h4>Notes</h4>
                    <a onclick="adminconversation.openModal(event, this, '#conversationNotesCreate')" class="btn btn--circle ml-2" href="#"><i class="icon-add"></i></a>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationNotes')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>
                
                <div class="conversations__modal__body">
                    <ul class="conversations__accordion__list">`;
                        
                        let NotesArray = [
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`,
                                desc: `<p>Curabitur ullamcorper libero id eleifend dictum.</p>
                                <p>Phasellus diam mi, ullamcorper sit amet ullamcorper vitae, ultricies nec nunc</p>
                                <p>Nunc ut urna eros.</p>`
                            },
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`,
                                desc: `<p>Curabitur ullamcorper libero id eleifend dictum.</p>
                                <p>Phasellus diam mi, ullamcorper sit amet ullamcorper vitae, ultricies nec nunc</p>
                                <p>Nunc ut urna eros.</p>`
                            },
                            {
                                title: `Lorem Ipsum`,
                                date: `13:00:00 - 01/01/2022`,
                                desc: `<p>Curabitur ullamcorper libero id eleifend dictum.</p>
                                <p>Phasellus diam mi, ullamcorper sit amet ullamcorper vitae, ultricies nec nunc</p>
                                <p>Nunc ut urna eros.</p>`
                            }
                        ];

                        NotesArray.forEach(function(note) {
                            templ += `
                            <li class="conversations__accordion__item">
                                <div class="conversations__accordion__title">
                                    <h5>${note.title}</h5>
                                </div>
                                <div class="conversations__accordion__desc active">
                                    <p>
                                        <small>${note.date}</small>
                                    </p>
                                    ${note.desc}
                                </div>
                            </li>`;
                        });

                    templ += `
                    </ul>
                </div>

            </div>
        </div>

        <div id="conversationTemplates" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <h4>Templates</h4>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationTemplates')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>
                
                <div class="conversations__modal__body">
                    <ul class="conversations__accordion__list">`;

                        let templatesArray = [
                            {
                                title: `Lorem Ipsum`,
                                desc: `Curabitur ullamcorper libero id eleifend dictum.
                                Phasellus diam mi, ullamcorper sit amet ullamcorper vitae, ultricies nec nunc
                                Nunc ut urna eros.`
                            },
                            {
                                title: `Greetings`,
                                desc: `Hello, hope you are doing all fine.
                                How can i help you ?`
                            }
                        ];

                        templatesArray.forEach(function(template) {
                            templ += `
                            <li class="conversations__accordion__item js-conversationsChatAccordionWrapper js-conversationsChatTemplateWrapper">
                                <div class="conversations__accordion__title">
                                    <h5>${template.title}</h5>
                                    <ul class="conversations__accordion__action">
                                        <li class="conversations__accordion__action__item">
                                            <a href="#" class="btn btn--circle btn--hover" onclick="adminconversation.toggleAccordionTemplate(event, this)"><i class="icon-remove_red_eye"></i></a>
                                        </li>
                                        <li class="conversations__accordion__action__item">
                                            <a href="#" class="btn btn--circle btn--hover-success" onclick="adminconversation.useChatTemplate(event, this)"><i class="icon-spellcheck"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="conversations__accordion__desc js-conversationsChatAccordionContent js-conversationsChatTemplateContent">${template.desc}</div>
                            </li>
                            `;
                        });

                    templ += `
                    </ul>
                </div>

            </div>
        </div>

        <div id="conversationSettings" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <h4>Settings</h4>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationSettings')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>
                
                <div class="conversations__modal__body">

                    <div>

                        <div class="row mb-1">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <a onclick="adminconversation.leaveConversation(event, this)" href="#" class="btn btn--icon btn-icon btn-danger"><span>Leave conversation</span><i class="icon-logout"></i></a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="conversations__modal__footer">
                    <ul class="conversations__modal__action">
                        <li class="conversations__modal__action__item">
                        <a onclick="adminconversation.saveConversationSettings(event, this)" href="#" class="btn btn--icon btn--hover btn--hover-success btn-icon">Save<i class="icon-save"></i></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div id="conversationAddDetails" class="conversations__modal__wrapper js-conversationsModal">
            <div class="conversations__modal">
                <div class="conversations__modal__header">
                    <h4>Details</h4>
                    <a onclick="adminconversation.closeModal(event, this ,'#conversationAddDetails')" href="#" class="conversations__modal__closebtn btn btn--circle btn--hover-danger js-conversationsModalClose"><i class="icon-clear"></i></a>
                </div>

                <div class="conversations__modal__body">
                    <div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label for="" class="input-label">Name</label>
                                <input type="text" class="form-control" name="" id="" value="" placeholder="Name..." aria-label="name">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label for="" class="input-label">Description</label>
                                <textarea class="form-control" name="" id="" value="" placeholder="add a small description..." aria-label="description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="conversations__modal__footer">
                    <ul class="conversations__modal__action">
                        <li class="conversations__modal__action__item">
                            <a onclick="adminconversation.saveConversationDetails(event, this)" href="#" class="btn btn--icon btn--hover btn--hover-success btn-icon">Save<i class="icon-save"></i></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>`;
        
        $(adminconversation.el.modal.wrapper).html(templ);
    },
    leaveConversation: (e, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('leaveConversation FN');
        }

        e = e || window.event;
        e.preventDefault();
        
        adminconversation.loader(true);
        
        setTimeout(() => {
            adminconversation.conversationEmptyText(true);
            adminconversation.loader(false);
        }, 600);

    },
    saveConversationDetails: (e, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('saveConversationDetails FN');
        }

        e = e || window.event;
        e.preventDefault();

        adminconversation.closeModal('', '' ,'#conversationAddDetails');

    },
    saveConversationNote: (e, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('saveConversationNote FN');
        }

        e = e || window.event;
        e.preventDefault();

        adminconversation.closeModal('', '' ,'#conversationNotesCreate');
        adminconversation.openModal('', '' ,'#conversationNotes');

    },
    saveConversationTag: (e, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('saveConversationTag FN');
        }

        e = e || window.event;
        e.preventDefault();

        adminconversation.closeModal('', '' ,'#conversationTagsCreate');
        adminconversation.openModal('', '' ,'#conversationTags');

    },
    saveConversationSettings: (e, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('saveConversationSettings FN');
        }

        e = e || window.event;
        e.preventDefault();

        adminconversation.closeModal('', '' ,'#conversationSettings');

    },
    fetchConversation: (e, currentElem = '', convoId)=> {
        if(!!adminconversation.el.debugger) {
            console.log('fetchConversation FN');
        }
        
        let templ = '';

        adminconversation.loader(true);

        setTimeout(() => {
            
            adminconversation.fetchModals(convoId, []);

            let convoDataArray = [
                {
                    message: `Joey...`,
                    date: '2021-01-12 19:10:30',
                    from: 'client',
                    hasAttachment: false,
                    attachements: []
                },
                {
                    message: `Can i come out of the box now?`,
                    date: '2021-01-12 19:10:30',
                    from: 'client',
                    hasAttachment: true,
                    attachements: [
                        {
                            name: 'test.pdf',
                            size: '12456',
                            link: '#'
                        }
                    ]
                },
                {
                    message: `Damn it Chandler you're not supposed to have your phone in there.`,
                    date: '2021-01-12 19:10:30',
                    from: 'agent',
                    hasAttachment: false,
                    attachements: []
                },
                {
                    message: `You can come out when you've done your thinking.`,
                    date: '2021-01-12 19:10:30',
                    from: 'agent',
                    hasAttachment: true,
                    attachements: [
                        {
                            name: 'hello.png',
                            size: '165',
                            link: '#'
                        }
                    ]
                },
                {
                    message: `And when I've finished these pizzas.`,
                    date: '2021-01-12 19:10:30',
                    from: 'agent',
                    hasAttachment: false,
                    attachements: []
                },
                {
                    message: `:(`,
                    date: '2021-01-12 19:10:30',
                    from: 'client',
                    hasAttachment: false,
                    attachements: []
                }
            ];


            templ = `
                <div class="conversations__chat__header">
                <div class="conversations__chat__header__info">
                    <h4>+123 234 6987</h4>
                    <p>the address of the person</p>
                    <a href="#" class="conversations__chat__header__info__edit btn btn--circle" onclick="adminconversation.openModal(event, this, '#conversationAddDetails')"><i class="icon-create"></i></a>
                </div>
                <div class="conversations__chat__header__option__wrapper">
                    <ul class="conversations__chat__header__option__list">
                    <li class="conversations__chat__header__option__item">
                        <a href="#" class="btn btn--circle" onclick="adminconversation.openModal(event, this, '#conversationNotes')">
                        <i class="icon-sticky_note_2"></i>
                        </a>
                    </li>
                    <li class="conversations__chat__header__option__item">
                        <a href="#" class="btn btn--circle" onclick="adminconversation.openModal(event, this, '#conversationTags')">
                        <i class="icon-tag"></i>
                        </a>
                    </li>
                    <li class="conversations__chat__header__option__item">
                        <a href="#" class="btn btn--circle" onclick="adminconversation.openModal(event, this, '#conversationSettings')">
                        <i class="icon-settings"></i>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>

                <div class="conversations__chat__body js-conversationsChatBody">
                    <div class="conversations__chat__message__container js-conversationsChatMessageContainer">`;
                    
                        convoDataArray.forEach(function(convo) {
                            let msg = convo.message.replace(/^\s+|\s+$/gm,''); // remove whitespaces and tabs
                            msg = msg.replace(/(?:\r\n|\r|\n)/g, '<br>'); // add br to newlines
                            let msgMarkup = ``;
                            if(msg.length > 0) {
                                msgMarkup = `
                                <div>${msg}</div>
                                `;
                            }

                            let attachementMarkup =``;

                            if(!!convo.hasAttachment) {
                                if(convo.attachements.length > 0) {
                                    convo.attachements.forEach(function(theAttachement) {
                                        attachementMarkup += `
                                            <div class="conversations__chat__message__attachment">
                                                <a href="${theAttachement.link}" class="widelink"></a>
                                                <i class="icon-insert_drive_file"></i>
                                                <div>
                                                    ${theAttachement.name}
                                                    <span>${theAttachement.size}</span>
                                                </div>
                                            </div>
                                        `;
                                    });
                                }
                            }

                            switch (convo.from) {
                                case 'client':
                                        templ += `
                                        <div class="conversations__chat__message__row">
                                            <div class="conversations__chat__message">
                                                ${attachementMarkup}
                                                ${msgMarkup}
                                                <p class="conversations__chat__message__time"><small>${convo.date}</small></p>
                                            </div>
                                        </div>`;
                                    break;
                                case 'agent':
                                        templ += `
                                        <div class="conversations__chat__message__row conversations__chat__message__row--start-right">
                                            <div class="conversations__chat__message conversations__chat__message--agent">
                                                ${attachementMarkup}
                                                ${msgMarkup}
                                                <p class="conversations__chat__message__time"><small>${convo.date}</small></p>
                                            </div>
                                        </div>`;
                                    break;
                                default:
                            }

                        });
                        
                        templ += `
                    </div>
                </div>

                <div class="conversations__chat__footer">
                    <div class="conversations__chat__footer__takeover__wrapper js-conversationsTakeover" onclick="adminconversation.takoverConver(event, this)">
                        <a href="#" class="widelink"></a>
                        <div class="conversations__chat__footer__takeover">
                            <i class="icon-support_agent"></i>
                            <h5>Take over this conversation.</h5>
                        </div>
                    </div>

                    <div class="conversations__chat__footer__container">
                        <form class="conversations__chat__sendmessage__form__wrapper">
                            <div class="conversations__chat__sendmessage__attachments js-conversationschAtattachmentTrayWrapper">
                                <input onchange="adminconversation.addAttachement(event, this)" type="file" name="" id="conversationschatattachmentfield" class="conversations__chat__sendmessage__attachments__field js-conversationschAtattachmentField">
                                <ul class="conversations__chat__sendmessage__attachments__list js-conversationschAtattachmentTrayList">
                                </ul>
                            </div>
                            <div class="conversations__chat__sendmessage__form">
                                <div class="conversations__chat__sendmessage__botreply m-0">
                                    <label class="input-label small mb-1" for="converstaion_bot_status" onclick="adminconversation.takoverConver(event, this)">Bot-reply</label>
                                    <div class="switch_checkbox">
                                        <input class="js-converstaionBotStatusField" type="checkbox" id="converstaion_bot_status" name="converstaion_bot_status" checked>
                                        <label for="converstaion_bot_status" onclick="adminconversation.takoverConver(event, this)"></label>
                                    </div>
                                </div>
                                <textarea placeholder="Write a message..." name="" id="" class="form-control js-conversationsChatSendmessageTextarea"></textarea>
                                <div>
                                    <button class="btn btn--circle btn--fill-default" type="button" onclick="adminconversation.sendMessage(event, this)"><i class="icon-send"></i></button>
                                </div>
                            </div>

                            <div class="conversations__chat__sendmessage__misc__wrapper">
                                <ul class="conversations__chat__sendmessage__misc">
                                    <li class="conversations__chat__sendmessage__misc__item">
                                        <button type="button" onclick="adminconversation.openModal(event, this, '#conversationTemplates')" class="btn btn--clear btn-icon btn-icon--left btn--circle btn--hover"><i class="icon-comment_bank"></i> Templates</button>
                                    </li>
                                    <li class="conversations__chat__sendmessage__misc__item">
                                        <label for="conversationschatattachmentfield" class="btn btn--clear btn-icon btn-icon--left btn--circle btn--hover m-0"><i class="icon-attach_file"></i> Attachment</label>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>

                </div>
            `;

            $(adminconversation.el.placeholders.container).html(templ);

            adminconversation.conversationEmptyText(false);

            setTimeout(() => {
                adminconversation.textareaAutoGrow(adminconversation.el.chatSendMessage.textarea);
                adminconversation.scrollToBottomOfConversation();
                adminconversation.loader(false);
            }, 300);
        }, 1000);
        

    },
    fetchAllConversations: (appId)=> {
        if(!!adminconversation.el.debugger) {
            console.log('fetchAllConversations FN');
        }

        /**
         * DO ajax fecth all conversation then send the array to generateSideBarItems function to actually generate the html template for all
         * NOTE: empty array "arr.lenght 0 will generate no message found text"
         */
        
        adminconversation.generateSideBarItems('fetchAllConversations', [1,2,3,4,5,6,7,8,9]);
    },
    loader:(show = false, delay = 300)=>{
        setTimeout(() => {
            $(adminconversation.el.loader).removeClass('active');
            if(!!show) {
                $(adminconversation.el.loader).addClass('active');
            }
        }, delay);
    },
    conversationEmptyText:(show = false)=>{
        $(adminconversation.el.conversation.empty).addClass('d-none');
        $(adminconversation.el.placeholders.container).removeClass('d-none');
        if(!!show) {
            $(adminconversation.el.conversation.empty).removeClass('d-none');
            $(adminconversation.el.placeholders.container).addClass('d-none');

            $(adminconversation.el.placeholders.container).html('');
            $(adminconversation.el.modal.wrapper).html('');
        }
    },
    addAttachement: (e, currentElem)=> {
        if(!!adminconversation.el.debugger) {
            console.log('addAttachement FN');
        }

        e = e || window.event;
        e.preventDefault();

        let fileName = $(adminconversation.el.attachement.field)[0].files[0].name;

        let templ = '';
        
        templ = `
            <li class="conversations__chat__sendmessage__attachments__item">
                <div class="conversations__chat__sendmessage__attachments__details">
                    <i class="icon-attach_file"></i>
                    <span>${fileName}</span>
                </div>
                <ul class="conversations__chat__sendmessage__attachments__actions">
                    <li>
                        <a onclick="adminconversation.removeAttachement(event, this)" href="#" class="btn btn--circle btn--hover  btn--hover-danger"><i class="icon-delete"></i></a>
                    </li>
                </ul>
            </li>
        `;

        $(adminconversation.el.attachement.trayList).html(templ);

        $(adminconversation.el.attachement.trayWrapper).slideDown();
    },
    removeAttachement: (e = window.event, currentElem = '')=> {
        if(!!adminconversation.el.debugger) {
            console.log('removeAttachement FN');
        }

        e = e || window.event;
        e.preventDefault();

        $(adminconversation.el.attachement.field).val("");
        $(adminconversation.el.attachement.trayWrapper).slideUp();
        setTimeout(() => {
            $(adminconversation.el.attachement.trayList).html('');
        }, 600);
    },
    openModal: (e, currentElem, modalId)=> {
        if(!!adminconversation.el.debugger) {
            console.log('OpenModal FN');
        }

        e = e || window.event;
        e.preventDefault();
        
        adminconversation.closeAllModal();

        if($(modalId).length > 0) {
            $(modalId).addClass('active');
        }
    },
    closeModal: (e, currentElem, modalId)=> {
        if(!!adminconversation.el.debugger) {
            console.log('Close Modal FN');
        }

        e = e || window.event;
        e.preventDefault();

        if($(modalId).length > 0) {
            $(modalId).removeClass('active');
        }

    },
    closeAllModal: ()=> {
        if(!!adminconversation.el.debugger) {
            console.log('Close All Modal FN');
        }

        $(adminconversation.el.modal.target).removeClass('active');
    },
    takoverConver: (e, currentElem, state)=> {
        if(!!adminconversation.el.debugger) {
            console.log('TakoverConver FN');
        }

        e.preventDefault();

        let checkBotTakeOverStatus = $(currentElem).parents(adminconversation.el.placeholders.mainWrapper).find(adminconversation.el.takover.configStatusField).prop("checked");

        if(checkBotTakeOverStatus) {
            if(!!adminconversation.el.debugger) {
                console.log('DO disable bot');
            }
    
            $(currentElem).parents(adminconversation.el.placeholders.mainWrapper).find(adminconversation.el.takover.target).fadeOut();
            $(currentElem).parents(adminconversation.el.placeholders.mainWrapper).find(adminconversation.el.takover.configStatusField).prop("checked", false);
        } else {
            if(!!adminconversation.el.debugger) {
                console.log('DO enable bot');
            }
            $(currentElem).parents(adminconversation.el.placeholders.mainWrapper).find(adminconversation.el.takover.target).fadeIn();
            $(currentElem).parents(adminconversation.el.placeholders.mainWrapper).find(adminconversation.el.takover.configStatusField).prop("checked", true);
        }
    },
    searchForConversation: (e, currentElem)=>{
        if(!!adminconversation.el.debugger) {
            console.log('Search for conversation FN');
        }
        e.preventDefault();
        let searchFor = $(currentElem).val();
        let searchForTrim = searchFor.replace(/\s/g, "");
        if(searchForTrim.length > 3) {
            console.log(`Search for  text : ${searchFor}`);
            // do ajax searchfor conversation
            adminconversation.generateSideBarItems('Search', [1,2]);
            $(adminconversation.el.sidebar.navTab).find(adminconversation.el.sidebar.navTabItem).removeClass('active');
            $($(adminconversation.el.sidebar.navTab).find(adminconversation.el.sidebar.navTabItem)[0]).addClass('active');
        }

        if (searchForTrim.length == 0) {
            adminconversation.generateSideBarItems('all', [1,2,3,4,5]);
            $(adminconversation.el.sidebar.navTab).find(adminconversation.el.sidebar.navTabItem).removeClass('active');
            $($(adminconversation.el.sidebar.navTab).find(adminconversation.el.sidebar.navTabItem)[0]).addClass('active');
        }
    },
    sidebarTabNavFilter: (e, currentElem, category)=> {
        if(!!adminconversation.el.debugger) {
            console.log('Sidebar Tab Nav FN');
        }
        
        e = e || window.event;
        e.preventDefault();
        
        let filterFor = category;
        $(adminconversation.el.sidebar.navTab).find(adminconversation.el.sidebar.navTabItem).removeClass('active');
        $(currentElem).addClass('active');

        console.log('TO DO FILTER SIDEBAR NAV BY : ' + filterFor);

        //DO generateSideBarItems on xhttp request success send the array for data to that fn
        adminconversation.generateSideBarItems(filterFor, [1,2,3,4,5]);

    },
    toggleAccordionTemplate: (e, currentElem)=> {
        if(!!adminconversation.el.debugger) {
            console.log('Toggle Accordion Template FN');
        }

        e.preventDefault();

        let content = $(currentElem).parents(adminconversation.el.chatAccordion.wrapper).find(adminconversation.el.chatAccordion.content);
        $(content).slideToggle();
    },
    useChatTemplate: (e, currentElem)=> {
        if(!!adminconversation.el.debugger) {
            console.log('use Chat Template FN');
        }

        e.preventDefault();

        let content = $(currentElem).parents(adminconversation.el.chatTemplates.wrapper).find(adminconversation.el.chatTemplates.content).html();

        content = content.replace(/^\s+|\s+$/gm,'');
        
        $(adminconversation.el.chatSendMessage.textarea).val(content);

        adminconversation.autoGrowOnce(adminconversation.el.chatSendMessage.textarea);
        
        $(adminconversation.el.chatSendMessage.textarea).focus();

        adminconversation.closeModal('', '' ,'#conversationTemplates');
    }, 
    generateSideBarItems: (tab, data)=>{
        if(!!adminconversation.el.debugger) {
            console.log('Generate Sidebar Items FN');
        }

        let templ = ``;

        if(data.length > 0) {
            data.forEach(function(element) {
                // console.log(element);

                templ += `
                <li class="conversations__sidebar__nav__item" onclick="adminconversation.fetchConversation(event, this, 000)">
                    <i class="icon-chat_bubble"></i>
                    <div class="conversations__sidebar__nav__item__desc">
                        <h5>the name / number ${tab}</h5>
                        <p>2021-01-12 19:10:30</p>
                        <ul class="conversations__sidebar__nav__note">
                            <li class="conversations__sidebar__nav__note__item">
                            <div class="badge badge--with-rounded">Tags</div>
                            </li>
                            <li class="conversations__sidebar__nav__note__item">
                            <div class="badge badge--with-rounded badge-hard-danger">Tags</div>
                            </li>
                            <li class="conversations__sidebar__nav__note__item">
                            <div class="badge badge--with-rounded badge-hard-info">Tags</div>
                            </li>
                            <li class="conversations__sidebar__nav__note__item">
                            <div class="badge badge--with-rounded badge-hard-warning">Tags</div>
                            </li>
                            <li class="conversations__sidebar__nav__note__item">
                            <div class="badge badge--with-rounded badge-hard-sucess">Tags</div>
                            </li>
                        </ul>
                        <div class="conversations__sidebar__nav__wrapup">
                            <ul class="conversations__sidebar__nav__note">
                                <li class="conversations__sidebar__nav__note__item">
                                    <div class="badge badge--with-rounded badge-hard-sucess">Wrapup</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            `;
            });
        } else {
                /** NO MESSAGE FOUND TEMPLATE */
                templ = `
                    <li class="conversations__sidebar__nav__item">
                        <div class="conversations__sidebar__nav__item__desc conversations__sidebar__nav__item__desc--empty">
                            <p>No messages found</p>
                        </div>
                    </li>
                `;
        }

        $(adminconversation.el.sidebar.navList).html(templ);
    },
    displayChatMessage: (data = [], sendLocalAttachement = false)=>{
        if(!!adminconversation.el.debugger) {
            console.log('Display Chat Message FN');
        }
        // let data = [
        //     {
        //         message: `Can i come out of the box now?`,
        //         date: '2021-01-12 19:10:30',
        //         from: 'client'
        //     },
        //     {
        //         message: `Damn it Chandler you're not supposed to have your phone in there.`,
        //         date: '2021-01-12 19:10:30',
        //         from: 'agent'
        //     }
        // ];
        let templ = '';

        let senderAttachmentMarkup = '';

        if (!!sendLocalAttachement) {
            senderAttachmentMarkup = adminconversation.sendAttachments();
        }

        if(data.length > 0){
            data.forEach(function(convo) {
                let msg = convo.message.replace(/(?:\r\n|\r|\n)/g, '<br>'); // add br to newlines
                let msgMarkup = ``;
                if(msg.length > 0) {
                    msgMarkup = `
                    <div>${msg}</div>
                    `;
                }
    
                switch (convo.from) {
                    case 'client':
                            templ += `
                            <div class="conversations__chat__message__row">
                                <div class="conversations__chat__message">
                                    ${msgMarkup}
                                    <p class="conversations__chat__message__time"><small>${convo.date}</small></p>
                                </div>
                            </div>`;
                        break;
                    case 'agent':
                            templ += `
                            <div class="conversations__chat__message__row conversations__chat__message__row--start-right">
                                    <div class="conversations__chat__message conversations__chat__message--agent">
                                    ${senderAttachmentMarkup} 
                                    ${msgMarkup}
                                    <p class="conversations__chat__message__time"><small>${convo.date}</small></p>
                                </div>
                            </div>`;
                        break;
                    default:
                }
    
            });
            
            $(adminconversation.el.appId + ' ' + adminconversation.el.chatMessage.container).append(templ);
            
            adminconversation.scrollToBottomOfConversation();
        }

    },
    scrollToBottomOfConversation: ()=>{

        let scrollBy = $(adminconversation.el.appId + ' ' + adminconversation.el.chatMessage.container)[0].scrollHeight - $(adminconversation.el.appId + ' ' + adminconversation.el.chatMessage.body)[0].clientHeight;
        
        if(scrollBy > 0) {
            $(adminconversation.el.appId + ' ' + adminconversation.el.chatMessage.body).animate(
                { 
                    scrollTop: scrollBy
                }
            );
        }
    },
    sendMessage: (e, currentElem)=> {
        if(!!adminconversation.el.debugger) {
            console.log('Send Message FN');
        }

        e = e || window.event;
        e.preventDefault();

        let msg = $(adminconversation.el.appId + ' ' + adminconversation.el.chatSendMessage.textarea).val();
        let attachmentCheck = $(adminconversation.el.attachement.field).val();
        
        let msgTrim = msg.replace(/\s/g, "");

        if(msgTrim.length > 0 || attachmentCheck.length > 0) {

            let conver = [
                {
                    message: msg,
                    date: moment().format('YYYY-MM-DD HH:MM:ss'),
                    from: 'agent'
                }
            ];
    
            $(adminconversation.el.appId + ' ' + adminconversation.el.chatSendMessage.textarea).val('');
            $(adminconversation.el.appId + ' ' + adminconversation.el.chatSendMessage.textarea).css('height', '');

            let checkForAttachment = false;
            let attachementField = $(adminconversation.el.attachement.field).val();

            if(attachementField.length > 0) {
                checkForAttachment = true;
            }
    
            adminconversation.displayChatMessage(conver, checkForAttachment);

        }

    },
    sendAttachments: ()=> {
        if(!!adminconversation.el.debugger) {
            console.log('sendAttachments FN');
        }

        let templ = ``;

        if($(adminconversation.el.attachement.field).val().length > 0) {
            let theFile = $(adminconversation.el.attachement.field)[0].files[0];
            let fileName = theFile.name;
            let fileSize = theFile.size;
            templ = `
                <div class="conversations__chat__message__attachment">
                    <a href="#" class="widelink"></a>
                    <i class="icon-insert_drive_file"></i>
                    <div>
                        ${fileName}
                        <span>${fileSize}</span>
                    </div>
                </div>
            `;
        }
        adminconversation.removeAttachement();
        return templ;
    },
    eventlogger: (uid, data)=> {
        if(!!adminconversation.el.debugger) {
            console.log('eventlogger FN', uid, data);
        }

    },
    textareaAutoGrow: (selector = adminconversation.el.chatSendMessage.textarea)=> {
        if(!!adminconversation.el.debugger) {
            console.log('autoGrow Textarea FN', selector);
        }
        
        if (!$(selector).hasClass('autoGrow-init')) {

            $(selector).on('input keyup paste', function() {
                adminconversation.autoGrowOnce(selector);
            });

            $(selector).addClass('autoGrow-init');
        }
    },
    autoGrowOnce:(selector = adminconversation.el.chatSendMessage.textarea)=> {
        let $el = $(selector);
        let offset = $el.innerHeight() - $el.height();
        let elScrollHeight = 0;

        let lines = $(selector).val().split("\n");
        let numOfLine = lines.length;
        let lineHeight = parseFloat($(selector).css('line-height').replace('px',''));
        let paddingTop = parseFloat($(selector).css('padding-top').replace('px',''));
        let paddingBottom = parseFloat($(selector).css('padding-bottom').replace('px',''));

        elScrollHeight = parseFloat( ( lineHeight * numOfLine ) + ( paddingTop + paddingBottom ) );

        if ($el.innerHeight() < elScrollHeight) {
            // Grow the field if scroll height is smaller
            $el.height(elScrollHeight - offset);
        } else {
            // Shrink the field and then re-set it to the scroll height in case it needs to shrink
            $el.height(1);
            $el.height(elScrollHeight - offset);
        }
    }
};