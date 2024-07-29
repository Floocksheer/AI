import prismadb from "@/lib/prismadb"; 
import { MAX_FILE_COUNT } from "@/constants";
import { auth } from "@clerk/nextjs/server";

export const increaseApiLimit = async () => { 
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
     userId: userId
     }
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {id: userApiLimit.id }, // Ensure we are updating by userId
      data: { count: userApiLimit.count + 1 }
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 }
    });
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
        userId: userId,
     // userId: userId // Ensure we are querying by userId
    }
  });

  if (!userApiLimit || userApiLimit.count < MAX_FILE_COUNT) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findFirst({
    where: {
      userId: userId
    }
  });

  if (!userApiLimit) {
    return 0;
  } 
  return userApiLimit.count;
}
