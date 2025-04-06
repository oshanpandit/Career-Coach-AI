"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
export const updateUser = async (data) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const result = await db.$transaction(
            async (tx) => {
                let industryInsight = await tx.IndustryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                });

                if (!industryInsight) {
                    industryInsight = await tx.IndustryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "MEDIUM",
                            topSkills: [],
                            marketOutlook: "NEUTRAL",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  //1week from now
                        }
                    })
                }

                const updateUser = await tx.User.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    }
                })
                console.log(updateUser,industryInsight);
                return { updateUser, industryInsight };
            },
            {
                timeout: 10000,
            }
        )
        return {success:true,...result}
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile"+error.message)
    }
}

export const getUserOnboardingStatus = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    // let user = await db.User.findUnique({
    //     where: {
    //         clerkUserId: userId
    //     }
    // })

    // if (!user) {
    //     user=await checkUser();
    // }

    const user=await checkUser();

    // try {
    //     const user = await db.User.findUnique({
    //         where: {
    //             clerkUserId: userId,
    //         },
    //         select: {
    //             industry: true,
    //         }
    //     });
        return {
            isOnboarded: !!user?.industry
        }
    // } catch (error) {
    //     console.error("Error checking onboarding status", error.messsage);
    //     throw new Error("Failed to check onboarding status");
    // }
}



