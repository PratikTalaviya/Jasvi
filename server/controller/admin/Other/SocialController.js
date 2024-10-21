const Socials = require("../../../model/Socials")

//============================================== SocialsInfo

exports.SocialsInfo = async (req, res) => {
    try {
        const data = await Socials.find({ isDeleted: false });
        return res.render('SocialMedia/SocialMedia', {
            SocialsInfo: data,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('back');
    }
}

//============================================== AddSocialMedia

exports.AddSocialMedia = async (req, res) => {
    try {
        return res.render('SocialMedia/AddSocialMedia', { message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('back');
    }
}

//==============================================  AddSocialMediaActions   

exports.AddSocialMediaActions = async (req, res) => {
    try {
        const soicalDetails = new Socials({
            name: req.body.name,
            link: req.body.link,
        })
        const saveSocialData = await soicalDetails.save();

        req.flash('message', 'New SocialMedia Added Successfully.')
        return res.redirect('/admin/SocialMedia');

    } catch (error) {
        req.flash('error', 'Please Enter Details')
        return res.redirect('/admin/AddSocialMedia')
    }
}

//==============================================  EditSocialMedia   

exports.EditSocialMedia = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Socials.findById(id)
        res.render('SocialMedia/EditSocialMedia', {
            data: data,
            message: req.flash('message'),
            error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
};

//==============================================  EditSocialMediaActions   

exports.EditSocialMediaActions = async (req, res) => {
    try {
        let id = req.params.id

        const updateSocial = Socials.findByIdAndUpdate(
            {
                _id: id
            },
            {
                name: req.body.name,
                link: req.body.link,
            }
        ).
            then(() => {
                req.flash('message', 'SocialMedia update successfully')
                return res.redirect('/admin/SocialMedia')

            }).catch((error) => {
                req.flash('error', "Not Updated");
                return res.redirect('back')
            });

    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
}

//==============================================  DeleteSocialMediaAction   

exports.DeleteSocialMediaAction = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This SocialMedia Is Not Available')
            return res.redirect('back')
        } else {
            const datas = await Socials.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        isDeleted: true
                    }
                }
            )
                .then(() => {
                    res.redirect('/admin/SocialMedia');
                    req.flash('message', 'Delete Successfully!')
                })
                .catch((err) => {
                    sendResponse(res, 400, { message: err.message });
                })
        }
    } catch (error) {
        req.flash('error', 'This SocialMedia Is Not Available')
        return res.redirect('back')
    }
}