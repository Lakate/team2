require('./quest_page_controls.css');

$(document).ready(() => {
    $('button.begin').on('click', () => {
        let questId = $('#questId').val();
        const data = {
            questId: questId
        };

        $('#checkin-modal').modal(); // Активируем модальное окно
        $('#checkin-modal').modal('show');
        $('#checkin-modal').scrollTop(0);

        $('#checkin-modal').on('hidden.bs.modal', function (e) {
            $(this).find('.modal-body p').text('Подождите пожалуйста...');
        });
        $('#checkin-modal').on('hide.bs.modal', function (e) {
            location.reload();
        });

        $.ajax({
            url: '/quests/start',
            type: 'POST',
            data: data
        }).done(result => {
            console.log(result);
            let modalBody = $('#checkin-modal').find('.modal-body p');
            let text = 'Поздравляем, вы успешно начали новый квест!';
            modalBody.text(text);
        }).fail(err => {
            console.log(err);
            let modalBody = $('#checkin-modal').find('.modal-body p');
            let text;
            switch (err.status) {
                case 401:
                    text = 'Извините, но начинать проходить квест' +
                        'могут только зарегистрированные пользователи..';
                    break;
                case 400:
                    text = 'Извините, но вы уже начали проходить данный квест.';
                    break;
                default:
                    text = 'Извините, произошла внутренняя ошибка сервиса, попробуйте еще раз.';
            }
            modalBody.text(text);
        });
    });
});
