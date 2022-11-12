import { VStack, Heading, Grid, GridItem } from "@chakra-ui/react"
import { BlogCard, BlogCardProps, FooterContentButton, Hero } from "ui";

function Events() {
    const blogs: Array<BlogCardProps> = [
        {
            link: 'https://clubs.ntu.edu.sg/csec/techterview-101-navigating-the-internship-world/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2022/02/Cover-Photo-768x512.png',
                alt: 'Tech Interview 101'
            },
            blogCardContentProps: {
                title: 'TECHTERVIEW 101: NAVIGATING THE INTERNSHIP WORLD',
                date: 'February 22, 2022',
                body: 'Techterview 101: Navigating the Internship World, a senior sharing event for the SCSE students took place on the 24th of February 2022. …'
            }
        },
        {
            link: 'https://clubs.ntu.edu.sg/csec/21st-main-committee/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2021/06/Untitled-768x606.png',
                alt: 'CSEC 21st'
            },
            blogCardContentProps: {
                title: '21ST MAIN COMMITTEE',
                date: 'March 31, 2021',
                body: 'Introducing the 21st Main Committee Mission of 21st Main Committee School of Computer Science and Engineering Club (CSEC Club) is a student organisation …'
            }
        },
        {
            link: 'https://clubs.ntu.edu.sg/csec/scse-dinner-dance-2019/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2020/01/IMG_0971-768x512.jpg',
                alt: 'SCSE Dinner and Dance 2019'
            },
            blogCardContentProps: {
                title: 'SCSE DINNER & DANCE 2019',
                date: 'January 15, 2020',
                body: 'SCSE Dinner & Dance 2019     The School of Computer Science and Engineering (SCSE) hosted its annual Dinner & Dance on …'
            }
        },
        {
            link: 'https://clubs.ntu.edu.sg/csec/sce-ocip-valentines-roses/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2016/01/sce_valentines_day-768x1086.png',
                alt: 'SCE OCIP VALENTINE’S ROSES'
            },
            blogCardContentProps: {
                title: 'SCE OCIP VALENTINE’S ROSES',
                date: 'January 25, 2016',
                body: 'Dear SCE-ians, Our very own SCE OCIP will be embarking on their overseas CIP project during the semester break coming May 25th …'
            }
        },
        {
            link: 'https://clubs.ntu.edu.sg/csec/sce-members-day/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2016/06/SCE_MEMBERS_DAY.jpg',
                alt: 'SCE MEMBER’S DAY'
            },
            blogCardContentProps: {
                title: 'SCE MEMBER’S DAY',
                date: 'January 13, 2016',
                body: 'Dear SCE-ians, Interested to know more about Computer Engineering Club and win vouchers? Here you go! CEC will be bringing you the …'
            }
        },
        {
            link: 'https://clubs.ntu.edu.sg/csec/sce-ocip-vietnam-recruitment-drive-2016/',
            blogCardImageProps: {
                src: 'https://clubs.ntu.edu.sg/csec/wp-content/uploads/2016/01/SCE_OCIP_2016-768x543.jpg',
                alt: 'SCE OCIP (VIETNAM), RECRUITMENT DRIVE 2016'
            },
            blogCardContentProps: {
                title: 'SCE OCIP (VIETNAM), RECRUITMENT DRIVE 2016',
                date: 'January 12, 2016',
                body: 'Dear SCE-ians, Not sure of what to do during the holidays? Want to have some fun, make new friends and forge everlasting …'
            }
        },
    ]

    return (
        <>
            <Hero backgroundImage='/banners/events-banner.png' backgroundGradient='linear(to-r, whiteAlpha.500, whiteAlpha.500)' />
            <VStack mx={{ base: 5, lg: 10 }}>
                <Heading p={ 5 }>
                    Recent/Ongoing Events
                </Heading>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
                    gap={ 12 }
                    pb={ 32 }>
                    { blogs.map(blogCardProps => (
                        <GridItem >
                            <BlogCard { ...blogCardProps } />
                        </GridItem>))}
                </Grid>
            </VStack>
            <FooterContentButton href="./contact" label="Contact Us" title="Let's Talk"/>
        </>
    )
}

export default Events